import { useState, useEffect, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LogOut,
  Users,
  Calendar,
  Clock,
  Search,
  RefreshCw,
  Filter,
  Download,
  Eye,
  MoreVertical,
  UserCheck,
  AlertCircle,
} from "lucide-react"
import { Button } from "../../ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card"
import { useAuth } from "../../context/AuthContext"
import axiosInstance from "../../util/axios"

const buttonHover = {
  scale: 1.05,
  transition: { type: "spring", stiffness: 300 },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const AdminDashboard = () => {
  const { auth, setAuth } = useAuth()
  const navigate = useNavigate()
  const [logs, setLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const logsPerPage = 10

  // Check admin role on mount; redirect non-admin
  useEffect(() => {
    if (!auth?.user?.role || auth.user.role !== "admin") {
      navigate("/login")
    }
  }, [auth, navigate])

  const fetchAllLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await axiosInstance.get("/attendance/all")
      setLogs(res.data)
      console.log("Fetched logs:", res.data)
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch logs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllLogs()
  }, [])

  // Filter logs by search term (employeeName)
  const filteredLogs = useMemo(() => {
    if (!searchTerm.trim()) return logs
    const term = searchTerm.toLowerCase()
    return logs.filter((log) => {
      const name = log.employeeId?.employeeName?.toLowerCase() || ""
      const email = log.employeeId?.email?.toLowerCase() || ""
      const date = new Date(log.date).toLocaleDateString().toLowerCase()
      return name.includes(term) || email.includes(term) || date.includes(term)
    })
  }, [logs, searchTerm])

  // Pagination calculations
  const indexOfLast = currentPage * logsPerPage
  const indexOfFirst = indexOfLast - logsPerPage
  const currentLogs = filteredLogs.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage)

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setAuth({ token: null, user: null })
    navigate("/login")
  }

  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i)

  // Stats calculations
  const totalEmployees = new Set(logs.map((log) => log.employeeId?.employeeName)).size
  const todayLogs = logs.filter((log) => {
    const today = new Date().toDateString()
    return new Date(log.date).toDateString() === today
  })
  const checkedInToday = todayLogs.filter((log) => log.checkIn && !log.checkOut).length

  const formatTime = (dateString) => {
    if (!dateString) return "--:--"
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusBadge = (log) => {
    if (log.checkIn && log.checkOut) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5" />
          Complete
        </span>
      )
    } else if (log.checkIn) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-1.5 animate-pulse" />
          Active
        </span>
      )
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
          <div className="w-1.5 h-1.5 bg-red-400 rounded-full mr-1.5" />
          Absent
        </span>
      )
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Modern Navbar */}
      <motion.div
        variants={itemVariants}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-black/20 border-b border-white/10 shadow-2xl"
      >
        <div className="flex justify-between items-center px-6 h-[80px] max-w-7xl mx-auto">
          {/* Logo + TrackZen */}
        <div className="flex items-center space-x-3">
           <img src="/logo.jpg" alt="TrackZen Logo" className="h-8 w-8" />
  <span className="text-xl font-bold text-white tracking-wide">TrackZen</span>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchAllLogs}
              disabled={loading}
              className="p-2 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <RefreshCw className={`w-4 h-4 text-gray-400 ${loading ? "animate-spin" : ""}`} />
            </motion.button>

            <motion.div whileHover={buttonHover} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white bg-transparent flex items-center justify-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                <span>Logout</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <main className="pt-24 px-6 max-w-7xl mx-auto relative z-10">
          {/* Admin Dashboard Heading */}
  <motion.h1
  variants={itemVariants}
  className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-10 tracking-wide"
>
  Welcome to the Admin Dashboard
</motion.h1>

        {/* Stats Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Total Employees</p>
                <p className="text-2xl font-bold text-white mt-1">{totalEmployees}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Today's Attendance</p>
                <p className="text-2xl font-bold text-white mt-1">{todayLogs.length}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">Currently Active</p>
                <p className="text-2xl font-bold text-white mt-1">{checkedInToday}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UserCheck className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div variants={itemVariants}>
          <Card className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="border-b border-white/10 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle className="flex items-center space-x-3 text-white text-xl">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <span>All Employee Attendance Logs</span>
                    <p className="text-sm text-gray-400 font-normal mt-1">Manage and monitor employee attendance</p>
                  </div>
                </CardTitle>

                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {/* Search */}
              <div className="mb-6 relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees, emails, or dates..."
                  className="w-full pl-10 pr-4 py-3 bg-white/5 backdrop-blur-xl border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading && (
                      <tr>
                        <td colSpan={7} className="text-center py-12">
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse delay-100" />
                            <div className="w-4 h-4 bg-cyan-500 rounded-full animate-pulse delay-200" />
                          </div>
                          <p className="text-gray-400 mt-2">Loading attendance logs...</p>
                        </td>
                      </tr>
                    )}
                    {error && (
                      <tr>
                        <td colSpan={7} className="text-center py-12">
                          <div className="flex items-center justify-center text-red-400 mb-2">
                            <AlertCircle className="w-5 h-5 mr-2" />
                            Error Loading Data
                          </div>
                          <p className="text-gray-400">{error}</p>
                        </td>
                      </tr>
                    )}
                    {!loading && !error && currentLogs.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-12">
                          <div className="text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No attendance records found</p>
                            <p className="text-sm mt-1">Try adjusting your search criteria</p>
                          </div>
                        </td>
                      </tr>
                    )}
                    {!loading &&
                      !error &&
                      currentLogs.map((log) => (
                        <motion.tr
                          key={log._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 group"
                        >
                          <td className="py-4 px-6">
                            <div className="text-white font-medium">
                              {new Date(log.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(log.date).toLocaleDateString("en-US", { weekday: "long" })}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                                {log.employeeId?.employeeName?.charAt(0) || "N"}
                              </div>
                              <div className="text-white font-medium">{log.employeeId?.employeeName}</div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="text-gray-300">{log.employeeId?.email || "N/A"}</div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-green-400" />
                              <span className="text-white font-mono">{formatTime(log.checkIn)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-red-400" />
                              <span className="text-white font-mono">{formatTime(log.checkOut)}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">{getStatusBadge(log)}</td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                              >
                                <Eye className="w-4 h-4 text-gray-400" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                              >
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    Showing {indexOfFirst + 1} to {Math.min(indexOfLast, filteredLogs.length)} of {filteredLogs.length}{" "}
                    results
                  </div>

                  <div className="flex justify-center space-x-2 select-none">
                    {pageNumbers.map((num) => (
                      <motion.button
                        key={num}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentPage(num)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                          num === currentPage
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                      >
                        {num}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default AdminDashboard
