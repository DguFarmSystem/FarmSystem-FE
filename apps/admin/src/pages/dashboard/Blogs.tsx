import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ModalBlogCreate from '@/components/blogs/ModalBlogCreate';
import PendingBlogsTable from '@/components/blogs/PendingBlogsTable';

export default function BlogsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setOpen(true)}>블로그 직접 생성</Button>
      </div>

      <PendingBlogsTable />

      {open && <ModalBlogCreate open={open} onClose={() => setOpen(false)} />}
    </div>
  );
}
