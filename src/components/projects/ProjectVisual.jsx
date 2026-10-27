import { Code2, FileText, BookOpen, ArrowRightLeft } from 'lucide-react'

/**
 * ProjectVisual
 * Rich, authentic architectural and UI wireframes representing each project's
 * real interface domain without inventing fake screenshots or stock imagery.
 */
export default function ProjectVisual({ project }) {
  const isDevPilot = project.slug === 'devpilot'
  const isResume = project.slug === 'resume-analyzer'
  const isLMS = project.slug === 'lms'
  const isCurrency = project.slug === 'currency-converter'

  return (
    <div className={`project-visual ${project.category} group/visual overflow-hidden relative`}>
      {/* Browser / Window Header Bar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.08]" aria-hidden="true">
        <div className="browser flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/40 border border-white/[0.06] text-[10px] font-mono text-muted/70">
          <span>{project.slug}.local</span>
        </div>
      </div>

      {/* Domain-Specific Visual Wireframe Content */}
      <div className="visual-body relative z-10 min-h-[96px] flex flex-col justify-between" aria-hidden="true">
        {isDevPilot && (
          <div className="devpilot-visual-preview flex flex-col gap-2 font-mono text-[11px]">
            {/* Editor Tab Bar */}
            <div className="flex items-center gap-2 text-[10px] text-muted">
              <span className="px-2 py-0.5 rounded bg-violet/20 text-violet border border-violet/30 flex items-center gap-1">
                <Code2 size={10} />
                workspace.tsx
              </span>
              <span className="px-2 py-0.5 rounded bg-white/[0.03] text-muted/60">runtime.ts</span>
            </div>
            {/* Code lines mockup */}
            <div className="space-y-1.5 pt-1 text-muted/80 text-[10.5px]">
              <div className="flex items-center gap-2">
                <span className="text-muted/40 select-none text-[9px]">01</span>
                <span className="text-violet">const</span>
                <span className="text-white">sandbox</span>
                <span className="text-indigo-400">=</span>
                <span className="text-emerald-400">await createIsolatedRuntime()</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted/40 select-none text-[9px]">02</span>
                <span className="text-violet">return</span>
                <span className="text-amber-300">executeCode(session, ast)</span>
              </div>
            </div>
            {/* Status indicator bar */}
            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[9.5px]">
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Workspace module
              </span>
              <span className="text-muted/60">Editor · API</span>
            </div>
          </div>
        )}

        {isResume && (
          <div className="resume-visual-preview flex flex-col gap-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-violet flex items-center gap-1 font-semibold">
                <FileText size={11} />
                PDF Stream Parser
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold">
                Structured feedback
              </span>
            </div>
            {/* Analysis bars */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[9.5px] text-muted">
                <span>Role criteria analysis</span>
                <span className="text-white">Ready</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-violet to-indigo w-[62%]" />
              </div>
              <div className="flex items-center justify-between text-[9.5px] text-muted pt-0.5">
                <span>Document parsing</span>
                <span className="text-emerald-400">Complete</span>
              </div>
            </div>
          </div>
        )}

        {isLMS && (
          <div className="lms-visual-preview flex flex-col gap-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-violet flex items-center gap-1 font-semibold">
                <BookOpen size={11} />
                Curriculum Track
              </span>
              <span className="text-muted/60">Lesson view</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.04] border border-white/[0.06]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-white text-[10px] truncate">Course organization</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 rounded bg-white/[0.02] border border-white/[0.03]">
                <span className="w-2 h-2 rounded-full bg-violet/40 shrink-0" />
              <span className="text-muted text-[10px] truncate">Lesson progress</span>
              </div>
            </div>
          </div>
        )}

        {isCurrency && (
          <div className="currency-visual-preview flex flex-col gap-2 font-mono text-[11px]">
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-violet flex items-center gap-1 font-semibold">
                <ArrowRightLeft size={11} />
                Exchange Stream
              </span>
              <span className="text-emerald-400 text-[9.5px]">Rate lookup</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-white/[0.04] border border-white/[0.06] my-1">
              <div className="flex flex-col">
                <span className="text-[9px] text-muted">BASE CURRENCY</span>
                <span className="text-white font-bold text-xs">Amount</span>
              </div>
              <span className="text-muted/40">→</span>
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-muted">TARGET CURRENCY</span>
                <span className="text-violet font-bold text-xs">Converted value</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
