// Main App component
import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { useAuth } from './hooks/useAuth';
import Layout from './components/common/Layout';
import PrivateRoute from './components/auth/PrivateRoute';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Login from './pages/Login';
import Alerts from './pages/Alerts';
import Tasks from './pages/Tasks';
import Users from './pages/Users';
import Settings from './pages/Settings';

// Creative portfolio-style theme with vibrant colors and modern design
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  colors: {
    brand: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    teal: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    purple: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7c3aed',
      800: '#6b21a8',
      900: '#581c87',
    },
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    coral: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    yellow: {
      50: '#fefce8',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    indigo: {
      50: '#eef2ff',
      100: '#e0e7ff',
      200: '#c7d2fe',
      300: '#a5b4fc',
      400: '#818cf8',
      500: '#6366f1',
      600: '#4f46e5',
      700: '#4338ca',
      800: '#3730a3',
      900: '#312e81',
    },
    slate: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    }
  },
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    glow: '0 0 20px rgba(59, 130, 246, 0.5)',
    colorful: '0 10px 40px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          boxShadow: 'xl',
          border: '1px solid',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
            bg: 'gray.800',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          _hover: {
            transform: 'translateY(-4px) scale(1.02)',
            boxShadow: '2xl',
          },
          background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
          backdropFilter: 'blur(10px)',
        },
      },
      variants: {
        elevated: {
          container: {
            bg: 'white',
            _dark: { bg: 'gray.800' },
            boxShadow: 'colorful',
            border: '1px solid',
            borderColor: 'gray.100',
            _dark: { borderColor: 'gray.700' },
          }
        },
        gradient: {
          container: {
            bgGradient: 'linear(135deg, brand.500, purple.500)',
            color: 'white',
            border: 'none',
            _hover: {
              bgGradient: 'linear(135deg, brand.600, purple.600)',
            }
          }
        }
      }
    },
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: {
          transform: 'translateY(-2px)',
        },
        _active: {
          transform: 'translateY(0) scale(0.98)',
        }
      },
      variants: {
        solid: {
          bgGradient: 'linear(135deg, brand.500, brand.600)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(135deg, brand.600, brand.700)',
            boxShadow: 'glow',
            transform: 'translateY(-2px)',
          },
          _active: {
            bgGradient: 'linear(135deg, brand.700, brand.800)',
          }
        },
        ghost: {
          _hover: {
            bg: 'gray.100',
            _dark: {
              bg: 'gray.700',
            },
            transform: 'translateY(-1px)',
          }
        },
        outline: {
          borderWidth: '2px',
          borderRadius: 'xl',
          _hover: {
            bg: 'brand.50',
            borderColor: 'brand.500',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
            _dark: {
              bg: 'brand.900',
            }
          }
        },
        gradient: {
          bgGradient: 'linear(135deg, teal.400, emerald.500)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(135deg, teal.500, emerald.600)',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(20, 184, 166, 0.4)',
          }
        }
      },
      sizes: {
        sm: {
          fontSize: 'sm',
          px: 4,
          py: 2,
          h: 8,
        },
        md: {
          fontSize: 'md',
          px: 6,
          py: 3,
          h: 10,
        },
        lg: {
          fontSize: 'lg',
          px: 8,
          py: 4,
          h: 12,
        }
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            borderWidth: '2px',
            borderColor: 'gray.200',
            _dark: { borderColor: 'gray.600' },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
              transform: 'scale(1.02)',
            },
            _hover: {
              borderColor: 'gray.300',
              _dark: { borderColor: 'gray.500' },
            },
            transition: 'all 0.2s',
          }
        },
        filled: {
          field: {
            bg: 'gray.50',
            _dark: { bg: 'gray.700' },
            borderRadius: 'xl',
            border: '2px solid transparent',
            _focus: {
              bg: 'white',
              _dark: { bg: 'gray.800' },
              borderColor: 'brand.500',
              transform: 'scale(1.02)',
            }
          }
        }
      }
    },
    Select: {
      variants: {
        outline: {
          field: {
            borderRadius: 'xl',
            borderWidth: '2px',
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
            }
          }
        }
      }
    },
    Textarea: {
      variants: {
        outline: {
          borderRadius: 'xl',
          borderWidth: '2px',
          _focus: {
            borderColor: 'brand.500',
            boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
          }
        }
      }
    },
    Modal: {
      baseStyle: {
        dialog: {
          borderRadius: '2xl',
          boxShadow: '2xl',
          backdropFilter: 'blur(10px)',
        }
      }
    },
    Table: {
      variants: {
        simple: {
          th: {
            borderColor: 'gray.200',
            _dark: {
              borderColor: 'gray.600',
            },
            fontSize: 'sm',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
            color: 'gray.600',
            _dark: {
              color: 'gray.400',
            },
            bg: 'gray.50',
            _dark: { bg: 'gray.700' },
          },
          td: {
            borderColor: 'gray.200',
            _dark: {
              borderColor: 'gray.600',
            }
          }
        }
      }
    },
    Badge: {
      baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
        fontSize: 'xs',
        px: 3,
        py: 1,
        textTransform: 'uppercase',
        letterSpacing: 'wider',
      },
      variants: {
        subtle: {
          bg: 'gray.100',
          color: 'gray.800',
          _dark: {
            bg: 'gray.700',
            color: 'gray.200',
          }
        },
        solid: {
          bg: 'brand.500',
          color: 'white',
        },
        outline: {
          borderWidth: '2px',
          borderColor: 'brand.500',
          color: 'brand.500',
        }
      }
    },
    Alert: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          border: '1px solid',
          backdropFilter: 'blur(10px)',
        }
      }
    },
    Stat: {
      baseStyle: {
        container: {
          bg: 'white',
          _dark: {
            bg: 'gray.800',
          },
          p: 6,
          borderRadius: '2xl',
          border: '1px solid',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
          },
          boxShadow: 'xl',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: '2xl',
          },
          position: 'relative',
          overflow: 'hidden',
          _before: {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            bgGradient: 'linear(to-r, brand.500, teal.500, purple.500)',
          }
        }
      }
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
        lineHeight: 'tall',
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: props.colorMode === 'dark' ? '#4A5568 #2D3748' : '#CBD5E0 #F7FAFC',
      },
      '*::-webkit-scrollbar': {
        width: '8px',
      },
      '*::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.700' : 'gray.100',
        borderRadius: 'full',
      },
      '*::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
        borderRadius: 'full',
        _hover: {
          bg: props.colorMode === 'dark' ? 'gray.400' : 'gray.500',
        }
      },
      // Add some creative background patterns
      '.pattern-dots': {
        backgroundImage: 'radial-gradient(circle, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      },
      '.pattern-grid': {
        backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }
    })
  }
});

const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route 
          path="/login" 
          element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" replace />} 
        />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <PrivateRoute>
              <Layout>
                <Inventory />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <PrivateRoute>
              <Layout>
                <Reports />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/alerts"
          element={
            <PrivateRoute>
              <Layout>
                <Alerts />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Layout>
                <Tasks />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <Layout>
                <Users />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />
        
        {/* Redirect any unknown routes to landing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <AppContent />
      </ChakraProvider>
    </Provider>
  );
};

export default App;