import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Smartphone, 
  ArrowRight
} from 'lucide-react';
import type { HousekeepingTask } from '../../types/hotel';

interface HousekeepingKanbanProps {
  tasks: HousekeepingTask[];
  onTaskStageChange: (taskId: string, newStage: 'dirty' | 'cleaning' | 'inspection' | 'ready') => void;
}

export const HousekeepingKanban: React.FC<HousekeepingKanbanProps> = ({
  tasks,
  onTaskStageChange
}) => {
  const stages: { id: 'dirty' | 'cleaning' | 'inspection' | 'ready'; title: string; color: string }[] = [
    { id: 'dirty', title: 'Dirty / To Clean', color: 'border-red-500/40 text-red-400 bg-red-500/10' },
    { id: 'cleaning', title: 'Cleaning in Progress', color: 'border-amber-500/40 text-amber-400 bg-amber-500/10' },
    { id: 'inspection', title: 'Quality Inspection', color: 'border-sky-500/40 text-sky-400 bg-sky-500/10' },
    { id: 'ready', title: 'Clean & Ready', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            Housekeeping Live Kanban
          </h2>
          <p className="text-xs text-zinc-400">Cleaner updates status live from smartphone → Manager watches room readiness in real-time.</p>
        </div>

        <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800">
          <Smartphone className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span>Mobile Staff Sync Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stages.map(stage => {
          const stageTasks = tasks.filter(t => t.stage === stage.id);
          return (
            <div key={stage.id} className="bg-zinc-900/50 p-4 rounded-2xl border border-zinc-800 flex flex-col space-y-3 min-h-[420px]">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border font-mono ${stage.color}`}>
                  {stage.title}
                </span>
                <span className="text-xs font-mono font-bold text-zinc-400">{stageTasks.length}</span>
              </div>

              <div className="space-y-2.5 flex-1 overflow-y-auto">
                {stageTasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700/60 rounded-xl space-y-2 transition-all shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg font-black text-white">Room {task.roomNumber}</span>
                      {task.priority === 'VIP Urgent' ? (
                        <span className="text-[9px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-mono border border-red-500/30">VIP Urgent</span>
                      ) : (
                        <span className="text-[9px] bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded font-mono">Normal</span>
                      )}
                    </div>

                    <div className="text-xs text-zinc-300 flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                      Cleaner: <span className="font-semibold text-white">{task.housekeeperName}</span>
                    </div>

                    <div className="text-[10px] text-zinc-400 flex items-center justify-between pt-1 border-t border-zinc-700/50">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.updatedAt}</span>
                    </div>

                    <div className="pt-1">
                      {stage.id === 'dirty' && (
                        <button 
                          onClick={() => onTaskStageChange(task.id, 'cleaning')}
                          className="w-full py-1.5 bg-amber-600/30 hover:bg-amber-600/50 text-amber-200 border border-amber-500/40 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                        >
                          Start Cleaning <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {stage.id === 'cleaning' && (
                        <button 
                          onClick={() => onTaskStageChange(task.id, 'inspection')}
                          className="w-full py-1.5 bg-sky-600/30 hover:bg-sky-600/50 text-sky-200 border border-sky-500/40 rounded-lg text-xs font-medium flex items-center justify-center gap-1"
                        >
                          Send for Inspection <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                      {stage.id === 'inspection' && (
                        <button 
                          onClick={() => onTaskStageChange(task.id, 'ready')}
                          className="w-full py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-md"
                        >
                          Approve & Mark Ready <CheckCircle2 className="w-3 h-3" />
                        </button>
                      )}
                      {stage.id === 'ready' && (
                        <div className="text-[10px] text-emerald-400 font-mono text-center flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Ready for Walk-in
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
