import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { LogIn, Eye, AlertTriangle, Users, Lock, Zap, Globe } from 'lucide-react';
import Logo from '../components/ui/Logo';
import Button from '../components/ui/Button';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignInClick = () => {
    navigate('/auth/signin');
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const scrollAnimation = {
    animate: {
      x: [0, -50],
      transition: {
        duration: 12,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop"
      }
    }
  };

  const features = [
    {
      icon: Eye,
      title: "Real-time Monitoring",
      description: "24/7 surveillance of VIP digital footprints across multiple platforms"
    },
    {
      icon: AlertTriangle,
      title: "Threat Detection",
      description: "Advanced AI-powered threat identification and risk assessment"
    },
    {
      icon: Users,
      title: "VIP Protection",
      description: "Specialized security protocols for high-profile individuals"
    },
    {
      icon: Lock,
      title: "Secure Intelligence",
      description: "Military-grade encryption and secure data handling"
    },
    {
      icon: Zap,
      title: "Rapid Response",
      description: "Instant alerts and automated threat mitigation protocols"
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Worldwide monitoring capabilities across all major platforms"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Aura Shield - VIP Threat Monitor</title>
        <meta name="description" content="Advanced VIP threat monitoring and protection platform with real-time intelligence and rapid response capabilities" />
      </Helmet>
      
      <div className="h-screen bg-background relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card opacity-50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(52,211,153,0.1),transparent_50%)]"></div>
        
        {/* Sign In Button - Top Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 right-6 z-10"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignInClick}
            className="flex items-center space-x-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 cursor-pointer"
          >
            <LogIn size={16} />
            <span>Sign In</span>
          </Button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="relative z-10 flex flex-col items-center justify-center h-full px-4 py-6 max-w-7xl mx-auto"
        >
          {/* Animated Logo */}
          <motion.div
            variants={logoVariants}
            className="mb-4"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="flex justify-center"
            >
              <Logo size="lg" showText={true} className="scale-125" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-4 w-full"
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2 tracking-tight">
              VIP Threat Monitor
            </h1>
            <p className="text-base md:text-lg text-text-secondary max-w-4xl mx-auto leading-relaxed">
              Advanced threat intelligence and protection platform designed for high-profile individuals and organizations
            </p>
          </motion.div>

          {/* Description */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-6 max-w-5xl mx-auto w-full"
          >
            <p className="text-xs text-text-secondary leading-relaxed mb-3 max-w-4xl mx-auto">
              Aura Shield provides comprehensive digital protection through real-time monitoring, 
              advanced threat detection, and rapid response capabilities. Our platform combines 
              cutting-edge AI technology with human expertise to safeguard your digital presence 
              across all major platforms and networks.
            </p>
            <p className="text-xs text-text-secondary/80 max-w-3xl mx-auto">
              Trusted by executives, celebrities, and high-profile organizations worldwide for 
              unparalleled security and peace of mind in the digital age.
            </p>
          </motion.div>

          {/* Features Horizontal Scroll */}
          <motion.div
            variants={itemVariants}
            className="w-full mb-6 overflow-hidden"
          >
            <motion.div
              variants={scrollAnimation}
              animate="animate"
              className="flex space-x-4"
              style={{ width: "200%" }}
            >
              {/* Duplicate features for seamless scrolling */}
              {[...features, ...features].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + (index % features.length) * 0.1 }}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-full p-4 hover:bg-card/70 transition-all duration-300 hover:scale-105 min-w-[280px] flex-shrink-0"
                >
                  <div className="flex items-center mb-2">
                    <div className="bg-primary/20 p-2 rounded-full mr-3">
                      <feature.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="text-xs font-semibold text-foreground">{feature.title}</h3>
                  </div>
                  <p className="text-text-secondary text-xs leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-0 left-0 right-0 py-3 text-center border-t border-border/30 bg-background/80 backdrop-blur-sm"
        >
          <p className="text-xs text-text-secondary">
            © 2025 Aura Shield. All rights reserved.
            <span className="text-primary font-medium ml-2">Coding Warriors</span>
          </p>
        </motion.footer>
      </div>
    </>
  );
};

export default LandingPage;
