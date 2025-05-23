import { useState, FormEvent } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

// interface Role {
//   id: number
//   name: string
// }

interface CreateProps extends PageProps {
  
}

export default function Create({ auth }: CreateProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const { data, setData, post, errors, processing } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    address: '',
    bio: '',
    profile_image: null as File | null,
  })

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'ผู้ใช้งาน', url: route('users.index') },
    { title: 'เพิ่มผู้ใช้งานใหม่', url: undefined }
  ]

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    post(route('users.store'))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('profile_image', file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">รายการ</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">เพิ่มผู้ใช้งานใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มผู้ใช้งานใหม่" />

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">รูปโปรไฟล์</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-center mb-6">
                      <img
                        className="h-32 w-32 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                        src={imagePreview || '/assets/img/demo/user-placeholder.svg'}
                        alt="รูปโปรไฟล์"
                      />
                    </div>
                    
                    <div className="text-sm italic text-gray-500 dark:text-gray-400 mb-4">
                      JPG หรือ PNG ขนาดไม่เกิน 2 MB
                    </div>
                    
                    <div className="relative">
                      <input
                        className={`w-full px-3 py-2 border ${errors.profile_image ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                        type="file"
                        id="profile_image"
                        name="profile_image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {errors.profile_image && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.profile_image}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">ข้อมูลส่วนตัว</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ชื่อ <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                          />
                          {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            อีเมล <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="email"
                            type="email"
                            className={`w-full px-3 py-2 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                          />
                          {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            รหัสผ่าน <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="password"
                            type="password"
                            className={`w-full px-3 py-2 border ${errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                          />
                          {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ยืนยันรหัสผ่าน <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="password_confirmation"
                            type="password"
                            className={`w-full px-3 py-2 border ${errors.password_confirmation ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                          />
                          {errors.password_confirmation && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password_confirmation}</p>}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            เบอร์โทรศัพท์
                          </label>
                          <input
                            id="phone"
                            type="text"
                            className={`w-full px-3 py-2 border ${errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                          />
                          {errors.phone && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.phone}</p>}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ที่อยู่
                          </label>
                          <textarea
                            id="address"
                            className={`w-full px-3 py-2 border ${errors.address ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            rows={3}
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                          ></textarea>
                          {errors.address && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.address}</p>}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ประวัติย่อ
                          </label>
                          <textarea
                            id="bio"
                            className={`w-full px-3 py-2 border ${errors.bio ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            rows={3}
                            value={data.bio}
                            onChange={(e) => setData('bio', e.target.value)}
                          ></textarea>
                          {errors.bio && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.bio}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-right">
                    <Link 
                      href={route('users.index')} 
                      className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 mr-2"
                    >
                      ยกเลิก
                    </Link>
                    <button 
                      type="submit" 
                      className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                      disabled={processing}
                    >
                      {processing ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  )
} 