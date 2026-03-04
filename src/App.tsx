import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CapturedMoments } from './components/CapturedMoments';
import { OurPackages } from './components/OurPackages';
import { About } from './components/About';
import { Explore } from './components/Explore';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { UserLogin } from './components/UserLogin';
import { Mountain, CheckCircle, X, LogOut, User as UserIcon, MessageSquare, Mail, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showUserLogin, setShowUserLogin] = useState(false);
  
  const [bookings, setBookings] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDest, setSelectedDest] = useState<any>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Fetch data from API on mount and poll for updates
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, bookingsRes, messagesRes, activitiesRes, feedbacksRes] = await Promise.all([
          fetch('/api/users'),
          fetch('/api/bookings'),
          fetch('/api/messages'),
          fetch('/api/activities'),
          fetch('/api/feedbacks')
        ]);

        const [usersData, bookingsData, messagesData, activitiesData, feedbacksData] = await Promise.all([
          usersRes.json(),
          bookingsRes.json(),
          messagesRes.json(),
          activitiesRes.json(),
          feedbacksRes.json()
        ]);

        // Check for status changes for the current user to show toast
        if (currentUser) {
          const oldUserBookings = bookings.filter(b => b.userId === currentUser.id);
          const newUserBookings = bookingsData.filter((b: any) => b.userId === currentUser.id);
          
          newUserBookings.forEach((nb: any) => {
            const ob = oldUserBookings.find(o => o.id === nb.id);
            if (ob && ob.status !== nb.status) {
              showToast(`Your booking for ${nb.packageName} has been ${nb.status}!`);
            }
          });
        }

        setUsers(usersData);
        setBookings(bookingsData);
        setMessages(messagesData);
        setActivities(activitiesData);
        setFeedbacks(feedbacksData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [currentUser, bookings]); // Added bookings to dependency to compare old vs new

  const logActivity = async (userName: string, type: string, description: string) => {
    const newActivity = {
      id: Math.random().toString(36).substr(2, 9),
      userName,
      type,
      description,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    try {
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newActivity)
      });
      setActivities(prev => [newActivity, ...prev].slice(0, 50));
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 5000);
  };

  const handleBook = (dest: any) => {
    if (!currentUser) {
      showToast("Please login to book a trip!");
      setShowUserLogin(true);
      return;
    }
    setSelectedDest(dest);
    setShowBookingModal(true);
  };

  const confirmBooking = async () => {
    const newBooking = {
      id: Math.random().toString(36).substr(2, 9),
      packageName: selectedDest.name,
      price: selectedDest.price,
      userId: currentUser?.id,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      status: 'PENDING'
    };

    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBooking)
      });
      setBookings([newBooking, ...bookings]);
      setShowBookingModal(false);
      showToast(`Booking confirmed for ${selectedDest.name}! Waiting for approval.`);
      logActivity(currentUser?.name || 'Guest', 'BOOKING', `booked a trip to ${selectedDest.name}`);
    } catch (error) {
      console.error("Failed to confirm booking:", error);
    }
  };

  const handleApproveBooking = async (id: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'APPROVED' })
      });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'APPROVED', adminMessage: 'Your booking has been successfully approved! Get ready for the adventure.' } : b));
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        logActivity('Admin', 'APPROVAL', `approved booking for ${booking.userName}`);
        showToast(`Booking for ${booking.userName} approved!`);
      }
    } catch (error) {
      console.error("Failed to approve booking:", error);
    }
  };

  const handleDeclineBooking = async (id: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'DECLINED' })
      });
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'DECLINED', adminMessage: 'Unfortunately, we cannot accommodate your request at this time. Please contact support for details.' } : b));
      const booking = bookings.find(b => b.id === id);
      if (booking) {
        logActivity('Admin', 'DECLINE', `declined booking for ${booking.userName}`);
        showToast(`Booking for ${booking.userName} declined.`);
      }
    } catch (error) {
      console.error("Failed to decline booking:", error);
    }
  };

  const handleRemoveBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id));
    showToast("Booking removed from records.");
  };

  const handleSendMessage = async (msg: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    try {
      await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...msg, id })
      });
      setMessages([{ ...msg, id }, ...messages]);
      showToast(`Message sent! We'll get back to you soon.`);
      logActivity(msg.name, 'MESSAGE', `sent a contact message`);
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendFeedback = async (feedback: any) => {
    const id = Math.random().toString(36).substr(2, 9);
    try {
      await fetch('/api/feedbacks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...feedback, id })
      });
      setFeedbacks([{ ...feedback, id }, ...feedbacks]);
      showToast(`Thank you for your feedback!`);
      logActivity(feedback.name, 'FEEDBACK', `submitted a feedback`);
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };

  const handleUserLogin = async (name: string, pass: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newUser = {
      id,
      name,
      password: pass,
      role: 'USER'
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });
      
      if (res.ok) {
        setCurrentUser(newUser);
        setUsers(prev => [...prev, newUser]);
      } else {
        // If user already exists, find them
        const existingUser = users.find(u => u.name === name && u.password === pass);
        if (existingUser) {
          setCurrentUser(existingUser);
        } else {
          showToast("Invalid credentials or user already exists.");
          return;
        }
      }
      
      setShowUserLogin(false);
      setActivePage('home');
      showToast(`Welcome, ${name}!`);
      logActivity(name, 'LOGIN', `logged into the website`);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const handleAdminLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'nepal2024') {
      setIsAdmin(true);
      setActivePage('admin');
      logActivity('Admin', 'ADMIN_LOGIN', `accessed the admin dashboard`);
    }
  };

  const handleRemoveUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast("User removed successfully");
  };

  const handleLogout = () => {
    const name = currentUser?.name;
    setCurrentUser(null);
    setIsAdmin(false);
    setActivePage('home');
    showToast("Logged out successfully");
    if (name) logActivity(name, 'LOGOUT', `logged out of the website`);
  };

  useEffect(() => {
    if (activePage !== 'admin') {
      const pageName = activePage.toUpperCase();
      logActivity(currentUser?.name || 'Guest', 'PAGE_VIEW', `viewed the ${pageName} page`);
    }
  }, [activePage]);

  const renderPage = () => {
    if (activePage === 'admin') {
      if (!isAdmin) return <AdminLogin onLogin={handleAdminLogin} />;
      return (
        <div className="pt-20">
            <AdminDashboard 
              bookings={bookings} 
              messages={messages} 
              users={users}
              activities={activities}
              feedbacks={feedbacks}
              onRemoveUser={handleRemoveUser}
              onApproveBooking={handleApproveBooking}
              onRemoveBooking={handleRemoveBooking}
              onDeclineBooking={handleDeclineBooking}
            />
        </div>
      );
    }

    switch (activePage) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Hero />
            <CapturedMoments />
            
            {/* Exclusive Experiences Section */}
            <div className="section-padding bg-white/[0.02]">
              <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                  <div className="max-w-2xl">
                    <p className="text-accent font-serif italic text-2xl mb-4">Exclusive Access</p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-none">UNSEEN <br /> NEPAL.</h2>
                  </div>
                  <p className="text-white/40 max-w-sm text-lg leading-relaxed">We provide access to the most remote corners of the Himalayas, where few have ever stepped. Experience the raw beauty of our land.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-[40px] overflow-hidden mb-8">
                      <img 
                        src="https://images.unsplash.com/photo-1605640840605-14ac1855827b?q=80&w=1200&auto=format&fit=crop" 
                        alt="Experience 1" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8">
                        <span className="px-4 py-2 rounded-full bg-accent text-white text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">Adventure</span>
                        <h3 className="text-3xl font-bold text-white">The Hidden Valleys of Dolpo</h3>
                      </div>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-[40px] overflow-hidden mb-8">
                      <img 
                        src="https://images.unsplash.com/photo-1526716173434-a2b5ad15368a?q=80&w=1200&auto=format&fit=crop" 
                        alt="Experience 2" 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8">
                        <span className="px-4 py-2 rounded-full bg-accent text-white text-[10px] font-bold tracking-widest uppercase mb-4 inline-block">Spiritual</span>
                        <h3 className="text-3xl font-bold text-white">Monastery Retreats in Mustang</h3>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            <WhyChooseUs />
            <OurPackages onBook={handleBook} />

            {/* Testimonials Section */}
            <div className="section-padding relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                  <p className="text-accent font-serif italic text-2xl mb-4">Testimonials</p>
                  <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">VOICES OF THE <br /> WILD.</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {feedbacks.length > 0 ? feedbacks.slice(0, 3).map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="glass p-10 rounded-[40px] border-white/5 relative"
                    >
                      <Star className="w-8 h-8 text-accent/20 absolute top-10 right-10" />
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                          {f.name[0]}
                        </div>
                        <div>
                          <p className="font-bold">{f.name}</p>
                          <div className="flex gap-0.5">
                            {[...Array(f.rating)].map((_, i) => (
                              <Star key={i} className="w-2 h-2 fill-accent text-accent" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/60 italic leading-relaxed text-lg">"{f.message}"</p>
                    </motion.div>
                  )) : (
                    <div className="col-span-full glass p-20 rounded-[40px] text-center border-white/5">
                      <p className="text-white/20 italic text-xl">Be the first to share your journey with us.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="section-padding relative overflow-hidden">
              <div className="absolute inset-0 bg-accent/5 -z-10" />
              <div className="max-w-4xl mx-auto glass p-12 md:p-20 rounded-[60px] text-center relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-2xl shadow-accent/40">
                  <Mail className="text-white w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">JOIN THE EXPEDITION</h2>
                <p className="text-white/60 mb-12 max-w-xl mx-auto text-lg">Subscribe to our newsletter for exclusive trekking tips, hidden destination guides, and early access to our 2024 expeditions.</p>
                <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-5 px-8 focus:outline-none focus:border-accent/50 transition-all text-white"
                  />
                  <button className="btn-primary py-5 px-10">SUBSCRIBE NOW</button>
                </form>
              </div>
            </div>

            <div className="section-padding bg-bg-dark flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img 
                  src="https://images.unsplash.com/photo-1533130061792-64b345e4a833?q=80&w=2000&auto=format&fit=crop" 
                  alt="Background" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="relative z-10">
                <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter leading-none">READY FOR <br /> ADVENTURE?</h2>
                <p className="text-white/60 mb-12 max-w-2xl mx-auto text-xl">Join thousands of happy travelers who have explored the beauty of Nepal with our expert guides.</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => setActivePage('explore')}
                    className="btn-primary px-12 py-6 text-sm"
                  >
                    EXPLORE ALL DESTINATIONS
                  </button>
                  <button 
                    onClick={() => setActivePage('contact')}
                    className="px-12 py-6 rounded-2xl border border-white/10 font-bold text-sm tracking-widest hover:bg-white hover:text-bg-dark transition-all"
                  >
                    CONTACT US
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <About />
            <WhyChooseUs />
          </motion.div>
        );
      case 'profile':
        return (
          <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pt-32 pb-20 max-w-4xl mx-auto px-6"
          >
            <div className="glass p-10 rounded-[40px]">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-24 h-24 rounded-full bg-accent/20 flex items-center justify-center text-accent text-3xl font-bold">
                  {currentUser?.name[0]}
                </div>
                <div>
                  <h2 className="text-4xl font-bold">{currentUser?.name}</h2>
                  <p className="text-white/40 tracking-widest uppercase text-sm">Member since {currentUser?.joinDate}</p>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-accent" /> My Bookings
                  </h3>
                  <div className="space-y-4">
                    {bookings.filter(b => b.userId === currentUser?.id).length === 0 ? (
                      <p className="text-white/20 italic">No bookings found. Start your adventure today!</p>
                    ) : (
                      bookings.filter(b => b.userId === currentUser?.id).map((booking, i) => (
                        <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 gap-4">
                          <div>
                            <p className="font-bold text-lg">{booking.packageName}</p>
                            <p className="text-sm text-white/40">{booking.date}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="text-accent font-bold mb-1">${booking.price}</p>
                            <span className={`text-[10px] font-bold tracking-widest px-3 py-1 rounded-full ${
                              booking.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 
                              booking.status === 'DECLINED' ? 'bg-red-500/20 text-red-500' : 
                              'bg-yellow-500/20 text-yellow-500'
                            }`}>
                              {booking.status === 'APPROVED' ? 'BOOKING SUCCESSFULLY APPROVED' : 
                               booking.status === 'DECLINED' ? 'BOOKING DECLINED' : 
                               'PENDING APPROVAL'}
                            </span>
                            {booking.adminMessage && (
                              <p className="mt-2 text-[10px] text-white/40 italic max-w-full sm:max-w-[200px] sm:ml-auto">
                                "{booking.adminMessage}"
                              </p>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" /> Share Your Feedback
                  </h3>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const feedback = {
                        name: currentUser?.name,
                        message: formData.get('feedback'),
                        date: new Date().toLocaleDateString(),
                        rating: 5
                      };
                      handleSendFeedback(feedback);
                      e.currentTarget.reset();
                    }}
                    className="space-y-4"
                  >
                    <textarea 
                      name="feedback"
                      placeholder="How was your experience with us?"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 focus:outline-none focus:border-accent/50 transition-all min-h-[120px]"
                      required
                    ></textarea>
                    <button type="submit" className="btn-primary">SUBMIT FEEDBACK</button>
                  </form>
                </div>

                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-xl font-bold mb-6">Account Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Full Name</p>
                      <p className="font-bold">{currentUser?.name}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Password</p>
                      <p className="font-bold">••••••••</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      case 'explore':
        return (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Explore onBook={handleBook} />
          </motion.div>
        );
      case 'gallery':
        return (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Gallery />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="pt-20"
          >
            <Contact onSendMessage={handleSendMessage} />
          </motion.div>
        );
      case 'login':
        return (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="pt-32 pb-20 flex items-center justify-center px-6"
          >
            <UserLogin 
              onLogin={handleUserLogin} 
              onClose={() => setActivePage('home')} 
            />
          </motion.div>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white bg-bg-dark">
      <Navbar 
        activePage={activePage} 
        onPageChange={setActivePage} 
        user={currentUser}
        onLogout={handleLogout}
      />
      
      <main>
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed bottom-10 right-10 z-[200] glass p-6 rounded-2xl border-accent/50 flex items-center gap-4 shadow-2xl shadow-accent/20"
          >
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <CheckCircle className="text-white w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-accent tracking-widest uppercase mb-1">Notification</p>
              <p className="text-sm font-bold">{notification}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBookingModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass p-10 rounded-[40px] w-full max-w-lg overflow-hidden"
            >
              <button 
                onClick={() => setShowBookingModal(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold mb-2">Confirm Booking</h3>
                <p className="text-white/40 text-sm">You are about to book your trip to {selectedDest?.name}</p>
              </div>

              <div className="bg-white/5 rounded-3xl p-6 mb-8">
                <div className="flex justify-between mb-4">
                  <span className="text-white/40">Destination</span>
                  <span className="font-bold">{selectedDest?.name}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-white/40">Price</span>
                  <span className="font-bold text-accent">${selectedDest?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Rating</span>
                  <span className="font-bold">★ {selectedDest?.rating}</span>
                </div>
              </div>

              <button 
                onClick={confirmBooking}
                className="btn-primary w-full justify-center py-5 text-sm tracking-[0.2em] font-bold"
              >
                CONFIRM & PAY
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-12 px-6 border-t border-white/5 bg-bg-dark">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setActivePage('home')}
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Mountain className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Travel<span className="text-accent">Nepal</span>
            </span>
          </div>
          
          <p className="text-white/40 text-xs tracking-widest">
            © 2024 TRAVELNEPAL. ALL RIGHTS RESERVED.
          </p>

          <div className="flex gap-8">
            <button 
              onClick={() => setActivePage('admin')}
              className="text-xs font-bold tracking-widest text-white/40 hover:text-accent transition-colors"
            >
              ADMIN PANEL
            </button>
            <a href="#" className="text-xs font-bold tracking-widest text-white/40 hover:text-accent transition-colors">PRIVACY</a>
            <a href="#" className="text-xs font-bold tracking-widest text-white/40 hover:text-accent transition-colors">TERMS</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
