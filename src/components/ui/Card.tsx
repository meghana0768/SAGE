'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

export function Card({ children, className = '', hover = false, delay = 0, onClick }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      onClick={onClick}
      className={`
        glass rounded-2xl soft-shadow p-5 
        ${hover ? 'card-hover cursor-pointer' : ''} 
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: ReactNode;
  color?: 'sage' | 'terracotta' | 'calm' | 'default';
  delay?: number;
}

export function StatCard({ title, value, subtitle, icon, trend, color = 'default', delay = 0 }: StatCardProps) {
  const colorClasses = {
    sage: 'border-l-4 border-[var(--color-sage)]',
    terracotta: 'border-l-4 border-[var(--color-terracotta)]',
    calm: 'border-l-4 border-[var(--color-calm)]',
    default: ''
  };

  return (
    <Card className={colorClasses[color]} delay={delay}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[var(--color-stone)] mb-1">{title}</p>
          <p className="text-2xl font-display font-bold text-[var(--color-charcoal)]">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-[var(--color-stone)] mt-1">{subtitle}</p>
          )}
          {trend && <div className="mt-2">{trend}</div>}
        </div>
        {icon && (
          <div className="p-3 bg-[var(--color-sand)] rounded-xl">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

interface ProgressCardProps {
  title: string;
  value: number;
  maxValue?: number;
  color?: string;
  subtitle?: string;
  delay?: number;
}

export function ProgressCard({ 
  title, 
  value, 
  maxValue = 100, 
  color = 'var(--color-sage)', 
  subtitle,
  delay = 0 
}: ProgressCardProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <Card delay={delay}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-[var(--color-charcoal)]">{title}</p>
          <p className="text-lg font-display font-bold" style={{ color }}>
            {value}
          </p>
        </div>
        <div className="h-2 bg-[var(--color-sand)] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, delay: delay + 0.2 }}
            className="h-full rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        {subtitle && (
          <p className="text-xs text-[var(--color-stone)]">{subtitle}</p>
        )}
      </div>
    </Card>
  );
}

