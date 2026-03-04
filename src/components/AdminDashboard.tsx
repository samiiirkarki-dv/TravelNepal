import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Package, 
  MessageSquare, 
  Activity, 
  Check, 
  X, 
  Trash2, 
  TrendingUp, 
  DollarSign, 
  Star,
  LayoutDashboard,
  Bell,
  Eye,
  Calendar,
  ArrowUpRight,
  Settings
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const chartData = [
  { name: 'Jan', revenue: 2400 },
  { name: 'Feb', revenue: 1398 },
  { name: 'Mar', revenue: 9800 },
  { name: 'Apr', revenue: 3908 },
  { name: 'May', revenue: 4800 },
  { name: 'Jun', revenue: 3800 },
  { name: 'Jul', revenue: 4300 },
];

interface AdminDashboardProps {
  bookings: any[];
  messages: any[];
  users?: any[];
  activities?: any[];
  feedbacks?: any[];
  onRemoveUser?: (id: string) => void;
  onApproveBooking?: (id: string) => void;
  onRemoveBooking?: (id: string) => void;
  onDeclineBooking?: (id: string) => void;
}

export const AdminDashboard = ({ 
  bookings, 
  messages, 
  users = [], 
  activities = [], 
  feedbacks = [],
  onRemoveUser,
  onApproveBooking,
  onRemoveBooking,
  onDeclineBooking
}: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const stats = [
    { label: 'Total Revenue', value: `$${bookings.filter(b => b.status === 'APPROVED').reduce((acc, b) => acc + b.price, 0).toLocaleString()}`, icon: DollarSign, color: 'text-green-500' },
    { label: 'Total Users', value: users.length, icon: Users, color: 'text-blue-500' },
    { label: 'Active Bookings', value: bookings.filter(b => b.status === 'PENDING').length, icon: Package, color: 'text-yellow-500' },
    { label: 'Total Messages', value: messages.length, icon: MessageSquare, color: 'text-purple-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass p-6 rounded-3xl border-white/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                      <stat.icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1 text-green-500 text-[10px] font-bold">
                      <TrendingUp className="w-3 h-3" />
                      <span>+12%</span>
                    </div>
                  </div>
                  <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 glass p-8 rounded-[40px] border-white/5 h-[450px]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-lg font-bold">Revenue Analytics</h3>
                  <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs focus:outline-none">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Year to Date</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height="80%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F27D26" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F27D26" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ color: '#F27D26' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#F27D26" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="lg:col-span-4 glass p-8 rounded-[40px] border-white/5">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-accent" /> Live Activity
                </h3>
                <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                  {activities.slice(0, 10).map((activity, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[10px] font-bold">
                        {activity.userName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] truncate">
                          <span className="font-bold text-white">{activity.userName}</span>
                          <span className="text-white/40"> {activity.description}</span>
                        </p>
                        <p className="text-[8px] text-white/20 mt-0.5 uppercase tracking-widest">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <h3 className="text-2xl font-bold mb-8">System Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Site Name</label>
                  <input type="text" defaultValue="TravelNepal" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent/50" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-2 block">Admin Email</label>
                  <input type="email" defaultValue="admin@travelnepal.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-accent/50" />
                </div>
                <button className="btn-primary w-full py-4">SAVE CHANGES</button>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-accent/5 rounded-3xl border border-accent/20">
                  <h4 className="font-bold mb-2">Maintenance Mode</h4>
                  <p className="text-xs text-white/40 mb-4">Temporarily disable the site for users while performing updates.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Status: OFF</span>
                    <button className="px-4 py-2 bg-white/5 rounded-xl text-[10px] font-bold hover:bg-white/10 transition-all">ENABLE</button>
                  </div>
                </div>
                <div className="p-6 bg-red-500/5 rounded-3xl border border-red-500/20">
                  <h4 className="font-bold mb-2 text-red-500">Danger Zone</h4>
                  <p className="text-xs text-white/40 mb-4">Permanently clear all activity logs and system cache.</p>
                  <button className="px-4 py-2 bg-red-500/10 text-red-500 rounded-xl text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all">CLEAR CACHE</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'bookings':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold">Manage Bookings</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">Live</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-xl bg-yellow-500/10 text-yellow-500 text-[10px] font-bold tracking-widest border border-yellow-500/20">
                  {bookings.filter(b => b.status === 'PENDING').length} PENDING
                </span>
                <span className="px-4 py-2 rounded-xl bg-green-500/10 text-green-500 text-[10px] font-bold tracking-widest border border-green-500/20">
                  {bookings.filter(b => b.status === 'APPROVED').length} APPROVED
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/5">
                    <th className="pb-4 px-4">User</th>
                    <th className="pb-4 px-4">Package</th>
                    <th className="pb-4 px-4">Price</th>
                    <th className="pb-4 px-4">Status</th>
                    <th className="pb-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                            {booking.userName ? booking.userName[0] : '?'}
                          </div>
                          <span className="font-bold">{booking.userName || 'Unknown'}</span>
                        </div>
                      </td>
                      <td className="py-6 px-4 font-medium">{booking.packageName}</td>
                      <td className="py-6 px-4 text-accent font-bold">${booking.price}</td>
                      <td className="py-6 px-4">
                        <span className={`text-[8px] font-bold tracking-widest px-3 py-1 rounded-full ${
                          booking.status === 'APPROVED' ? 'bg-green-500/20 text-green-500' : 
                          booking.status === 'DECLINED' ? 'bg-red-500/20 text-red-500' : 
                          'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-6 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {booking.status === 'PENDING' && (
                            <>
                              <button 
                                onClick={() => onApproveBooking?.(booking.id)}
                                className="p-2 rounded-xl bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white transition-all"
                                title="Approve"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => onDeclineBooking?.(booking.id)}
                                className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                title="Decline"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button 
                            onClick={() => onRemoveBooking?.(booking.id)}
                            className="p-2 rounded-xl bg-white/5 text-white/40 hover:bg-red-500 hover:text-white transition-all"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl font-bold">User Management</h3>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] font-bold text-green-500 tracking-widest uppercase">Live</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 text-[10px] font-bold tracking-widest border border-blue-500/20">
                  {users.length} TOTAL USERS
                </span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white/5">
                    <th className="pb-4 px-4">User</th>
                    <th className="pb-4 px-4">Join Date</th>
                    <th className="pb-4 px-4">Bookings</th>
                    <th className="pb-4 px-4">Spent</th>
                    <th className="pb-4 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user.id} className="group hover:bg-white/5 transition-colors">
                      <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent font-bold">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-bold">{user.name}</p>
                            <p className="text-[10px] text-white/40">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-white/60">{user.joinDate}</td>
                      <td className="py-6 px-4 font-bold">
                        {bookings.filter(b => b.userId === user.id).length}
                      </td>
                      <td className="py-6 px-4 text-accent font-bold">
                        ${bookings.filter(b => b.userId === user.id && b.status === 'APPROVED').reduce((acc, b) => acc + b.price, 0)}
                      </td>
                      <td className="py-6 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="p-2 rounded-xl bg-white/5 text-white/40 hover:bg-accent hover:text-white transition-all"
                            title="View Private Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onRemoveUser?.(user.id)}
                            className="p-2 rounded-xl bg-white/5 text-white/40 hover:bg-red-500 hover:text-white transition-all"
                            title="Remove User"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'activities':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <h3 className="text-2xl font-bold mb-8">System Activity Logs</h3>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-white/20 italic text-center py-10">No activities recorded yet.</p>
              ) : (
                activities.map((activity, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-bold text-white">{activity.userName}</span>
                        <span className="text-white/60"> {activity.description}</span>
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[8px] text-white/20 uppercase tracking-widest">{activity.time}</span>
                        <span className="text-[8px] bg-white/5 px-2 py-0.5 rounded text-white/40 uppercase tracking-widest">{activity.type}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'feedbacks':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <h3 className="text-2xl font-bold mb-8">User Testimonials & Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {feedbacks.length === 0 ? (
                <p className="col-span-full text-white/20 italic text-center py-10">No feedback received yet.</p>
              ) : (
                feedbacks.map((feedback, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                        {feedback.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{feedback.name}</p>
                        <div className="flex gap-0.5">
                          {[...Array(feedback.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>
                      <span className="ml-auto text-[8px] text-white/20 uppercase tracking-widest">{feedback.date}</span>
                    </div>
                    <p className="text-white/60 text-sm italic leading-relaxed">"{feedback.message}"</p>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="glass p-8 rounded-[40px] border-white/5">
            <h3 className="text-2xl font-bold mb-8">Inquiries & Messages</h3>
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-bold">
                        {msg.name[0]}
                      </div>
                      <div>
                        <p className="font-bold">{msg.name}</p>
                        <p className="text-xs text-white/40">{msg.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest text-white/20 uppercase">New Message</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">{msg.message}</p>
                  <div className="mt-6 flex justify-end">
                    <button className="text-[10px] font-bold tracking-widest text-accent hover:text-white transition-colors">REPLY VIA EMAIL</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar Nav */}
        <div className="lg:w-64 space-y-2 overflow-x-auto lg:overflow-visible flex lg:flex-col pb-4 lg:pb-0 gap-2 lg:gap-2 no-scrollbar">
          <div className="mb-10 hidden lg:block">
            <h2 className="text-2xl font-bold tracking-tight">Admin<span className="text-accent">Panel</span></h2>
            <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase mt-1">Management Console</p>
          </div>
          
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'bookings', label: 'Bookings', icon: Package },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'messages', label: 'Messages', icon: MessageSquare },
            { id: 'activities', label: 'Activity', icon: Activity },
            { id: 'feedbacks', label: 'Feedback', icon: Star },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-shrink-0 lg:w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-accent text-white shadow-lg shadow-accent/20' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
            </button>
          ))}

          <div className="pt-10 hidden lg:block">
            <div className="glass p-6 rounded-3xl border-white/5 bg-accent/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-xl bg-accent flex items-center justify-center">
                  <Bell className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-bold">System Status</p>
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed mb-4">All systems operational. Last backup 2h ago.</p>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full w-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 scroll-smooth">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-500 tracking-widest uppercase">Live System</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight capitalize">{activeTab}</h1>
              <p className="text-white/40 text-sm mt-1">Welcome back, Administrator.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white transition-all">
                <Bell className="w-5 h-5" />
              </button>
              <div className="h-10 w-px bg-white/5 mx-2" />
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold">Admin User</p>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Super Admin</p>
                </div>
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedUser(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative glass p-10 rounded-[40px] w-full max-w-md"
            >
              <button 
                onClick={() => setSelectedUser(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 text-accent text-2xl font-bold">
                  {selectedUser.name[0]}
                </div>
                <h3 className="text-2xl font-bold">{selectedUser.name}</h3>
                <p className="text-white/40 text-xs tracking-widest uppercase">Private User Details</p>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">User ID</p>
                  <p className="font-mono text-xs">{selectedUser.id}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Password (Private)</p>
                  <p className="font-bold text-accent">{selectedUser.password}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] text-white/40 uppercase font-bold mb-1">Join Date</p>
                  <p className="font-bold">{selectedUser.joinDate}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
