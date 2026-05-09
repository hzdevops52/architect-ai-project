import { motion } from "framer-motion";
import { Clock, ChevronRight, RotateCcw, Cpu, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface WorkspaceSidebarProps {
  hasArchitecture: boolean;
  history: string[];
  onHistoryClick: (prompt: string) => void;
  onReset: () => void;
  currentPrompt?: string;
  isMobile?: boolean;
}

export function WorkspaceSidebar({ 
  hasArchitecture, 
  history, 
  onHistoryClick, 
  onReset,
  currentPrompt,
  isMobile = false
}: WorkspaceSidebarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out");
    navigate("/");
  };

  const initials = (user?.user_metadata?.display_name || user?.email || "U")
    .toString()
    .split(/[\s@]/)[0]
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside className={`${isMobile ? 'flex flex-col h-full' : 'w-72 border-r border-border bg-sidebar flex flex-col h-screen sticky top-0'}`}>
      {/* Header - Only show on desktop */}
      {!isMobile && (
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2.5 group">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center ring-1 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300"
            >
              <Cpu className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">ArchitectAI</span>
          </Link>
        </div>
      )}

      {/* Current Project */}
      {hasArchitecture && currentPrompt && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="p-4 border-b border-border bg-secondary/30"
        >
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Current Design
            </label>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onReset}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                New
              </Button>
            </motion.div>
          </div>
          <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{currentPrompt}</p>
        </motion.div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="p-4 flex-1 overflow-auto">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <Clock className="w-3 h-3" />
            History
          </label>
          <div className="space-y-1 mt-3">
            {history.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => onHistoryClick(item)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ x: 4 }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-all duration-200 truncate group flex items-center justify-between"
              >
                <span className="truncate">{item}</span>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all duration-200 flex-shrink-0" />
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasArchitecture && history.length === 0 && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center mx-auto mb-3"
            >
              <Clock className="w-6 h-6 text-muted-foreground" />
            </motion.div>
            <p className="text-sm text-muted-foreground">
              Your design history will appear here
            </p>
          </div>
        </div>
      )}

      {/* User footer */}
      {user && (
        <div className="p-3 border-t border-border mt-auto">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-semibold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {user.user_metadata?.display_name || user.email?.split("@")[0]}
              </p>
              <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10 shrink-0"
              title="Sign out"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </aside>
  );
}
