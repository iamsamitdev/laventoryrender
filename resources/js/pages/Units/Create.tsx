import { useEffect } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'
import InputError from '@/Components/InputError'

export default function Create({ auth }: PageProps) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    slug: '',
    short_code: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('units.store'), {
      onSuccess: () => reset()
    })
  }

  // สร้าง slug อัตโนมัติจากชื่อ
  useEffect(() => {
    const slug = data.name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
    
    setData('slug', slug)
  }, [data.name])

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'หน่วยวัด', url: route('units.index') },
    { title: 'เพิ่มหน่วยวัดใหม่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col space-y-1">
              <p className="text-sm text-gray-500 dark:text-gray-400">ฟอร์ม</p>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                เพิ่มหน่วยวัดใหม่
              </h2>
            </div>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มหน่วยวัดใหม่" />

      <div className="py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbsItems} />

          <div className="mt-6">
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">ข้อมูลหน่วยวัด</h3>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <label className="block font-medium text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="name">
                    ชื่อหน่วยวัด <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    placeholder="เช่น กล่อง, ชิ้น, เมตร" 
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                  <label className="block font-medium text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="slug">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="slug"
                    className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    placeholder="slug-url-format" 
                    value={data.slug}
                    onChange={(e) => setData('slug', e.target.value)}
                  />
                  <InputError message={errors.slug} className="mt-2" />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    ใช้สำหรับ URL และระบบภายใน ควรเป็นภาษาอังกฤษ ตัวพิมพ์เล็ก ไม่มีช่องว่าง
                  </p>
                </div>
                <div>
                  <label className="block font-medium text-sm text-gray-700 dark:text-gray-300 mb-1" htmlFor="short_code">
                    โค้ดย่อ <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="short_code"
                    className="mt-1 p-2 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                    placeholder="เช่น pcs, kg, m" 
                    value={data.short_code}
                    onChange={(e) => setData('short_code', e.target.value)}
                  />
                  <InputError message={errors.short_code} className="mt-2" />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    ใช้แสดงตัวย่อสั้นๆ ของหน่วยวัด เช่น pcs, kg, m
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 px-4 py-3 flex items-center justify-end space-x-3 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  href={route('units.index')} 
                  className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                >
                  ยกเลิก
                </Link>
                <button 
                  type="submit" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                  disabled={processing}
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 