import React from 'react';
import { Brush, CheckCircle2, Clock } from 'lucide-react';
import type { HousekeepingTask } from '../../types/hotel';

interface CleanerMobileModuleProps {
  tasks: HousekeepingTask[];
  onTaskStageChange: (taskId: string, newStage: 'dirty' | 'cleaning' | 'inspection' | 'ready') => void;
}

export const CleanerMobileModule: React.FC<CleanerMobileModuleProps> = ({
  tasks,
  onTaskStageChange
}) => {
  const dirtyTasks = tasks.filter(t => t.stage === 'dirty');
  const cleaningTasks = tasks.filter(t => t.stage === 'cleaning');
  const readyTasks = tasks.filter(t => t.stage === 'ready');

  return (
    <div className="max-w-md mx-auto space-y-4">
      <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-500/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
            <Brush className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Housekeeping Mobile Sync</h2>
            <p className="text-[11px] text-emerald-300">Suresh K. (Floor 1 & 2 Staff)</p>
          </div>
        </div>

        <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
          Mobile Mode
        </span>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Rooms Needing Action ({dirtyTasks.length + cleaningTasks.length})</h3>

        {dirtyTasks.map(task => (
          <div key={task.id} className="p-4 bg-red-950/20 border border-red-500/40 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-extrabold text-white">Room {task.roomNumber}</span>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                Dirty / Checkout
              </span>
            </div>

            <div className="text-xs text-zinc-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span>Checkout time: {task.updatedAt}</span>
            </div>

            <button 
              onClick={() => onTaskStageChange(task.id, 'cleaning')}
              className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2"
            >
              <Brush className="w-4 h-4" /> Start Cleaning Room {task.roomNumber}
            </button>
          </div>
        ))}

        {cleaningTasks.map(task => (
          <div key={task.id} className="p-4 bg-amber-950/20 border border-amber-500/40 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-extrabold text-white">Room {task.roomNumber}</span>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Cleaning in Progress
              </span>
            </div>

            <button 
              onClick={() => onTaskStageChange(task.id, 'ready')}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" /> Mark Room {task.roomNumber} Clean & Ready!
            </button>
          </div>
        ))}

        {readyTasks.length > 0 && (
          <div className="pt-3">
            <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Completed Today ({readyTasks.length})</h4>
            {readyTasks.map(task => (
              <div key={task.id} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between text-xs text-zinc-400 mb-2">
                <span>Room {task.roomNumber}</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Clean</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
