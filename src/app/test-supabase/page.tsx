import { createClient } from '@/utils/supabase/server'
export const dynamic = 'force-dynamic'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div className="bg-background min-h-screen pt-32 px-12 text-foreground">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Supabase Connection Test</h1>
      <ul className="space-y-4">
        {todos?.map((todo: any) => (
          <li key={todo.id} className="p-4 bg-surface border border-border rounded-xl font-mono text-sm">
            {todo.name}
          </li>
        ))}
        {(!todos || todos.length === 0) && (
          <p className="text-nebula italic">No data returned or table 'todos' does not exist yet.</p>
        )}
      </ul>
    </div>
  )
}
