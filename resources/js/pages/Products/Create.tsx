import { useState, useEffect } from 'react'
import { Head, useForm, Link } from '@inertiajs/react'
import { PageProps } from '@/types'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import Breadcrumbs from '@/Components/Breadcrumbs'

interface Category {
  id: number
  name: string
}

interface Unit {
  id: number
  name: string
}

interface CreateProps extends PageProps {
  categories: Category[]
  units: Unit[]
}

export default function Create({ auth, categories, units }: CreateProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [autoGenerateSlug, setAutoGenerateSlug] = useState(true)

  const { data, setData, post, errors, processing } = useForm({
    name: '',
    slug: '',
    category_id: categories.length > 0 ? categories[0].id : '',
    unit_id: units.length > 0 ? units[0].id : '',
    quantity: 0,
    quantity_alert: 0,
    buying_price: 0,
    selling_price: 0,
    tax: 0,
    tax_type: 0,
    product_image: null as File | null,
    notes: '',
  })

  // สร้าง slug จากชื่อสินค้า
  useEffect(() => {
    if (autoGenerateSlug && data.name) {
      const slug = data.name
        .toLowerCase()
        .replace(/[^\w\sก-๙]/gi, '')
        .replace(/\s+/g, '-')
      setData('slug', slug)
    }
  }, [data.name, autoGenerateSlug])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post(route('products.store'))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setData('product_image', file)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const breadcrumbsItems = [
    { title: 'หน้าหลัก', url: route('dashboard') },
    { title: 'สินค้า', url: route('products.index') },
    { title: 'เพิ่มสินค้าใหม่', url: undefined }
  ]

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-sm text-gray-500 dark:text-gray-400">ฟอร์ม</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">เพิ่มสินค้าใหม่</h2>
          </div>
        </div>
      }
    >
      <Head title="เพิ่มสินค้าใหม่" />

      <div className="pb-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Breadcrumbs items={breadcrumbsItems} />

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">รูปสินค้า</h3>
                  </div>
                  <div className="p-6">
                    <img
                      className="w-full h-auto rounded-lg border border-gray-200 dark:border-gray-700 mb-4"
                      src={imagePreview || '/assets/img/products/default.webp'}
                      alt="รูปสินค้า"
                    />

                    <div className="text-sm italic text-gray-500 dark:text-gray-400 mb-4">
                      JPG หรือ PNG ขนาดไม่เกิน 2 MB
                    </div>

                    <div className="relative">
                      <input
                        className={`w-full px-3 py-2 border ${errors.product_image ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                        type="file"
                        id="image"
                        name="product_image"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {errors.product_image && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.product_image}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">รายละเอียดสินค้า</h3>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ชื่อสินค้า <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                          />
                          {errors.name && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.name}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Slug <span className="text-red-600">*</span>
                          </label>
                          <div className="flex rounded-md shadow-sm">
                            <input
                              id="slug"
                              type="text"
                              className={`flex-grow px-3 py-2 border ${errors.slug ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 ${autoGenerateSlug ? 'bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400' : ''}`}
                              value={data.slug}
                              onChange={(e) => setData('slug', e.target.value)}
                              disabled={autoGenerateSlug}
                            />
                            <div className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-r-md">
                              <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  className="h-4 w-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                  checked={autoGenerateSlug}
                                  onChange={() => setAutoGenerateSlug(!autoGenerateSlug)}
                                />
                                <span className="text-sm">สร้างอัตโนมัติ</span>
                              </label>
                            </div>
                          </div>
                          {errors.slug && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.slug}</p>
                          )}
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            ใช้สำหรับ URL และระบบภายใน ควรเป็นตัวพิมพ์เล็ก ไม่มีช่องว่าง
                          </p>
                        </div>

                        <div className="mb-4">
                          <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            หมวดหมู่ <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="category_id"
                            className={`w-full px-3 py-2 border ${errors.category_id ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.category_id}
                            onChange={(e) => setData('category_id', e.target.value)}
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errors.category_id && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.category_id}</p>
                          )}
                        </div>

                        <div className="mb-4">
                          <label htmlFor="unit_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            หน่วยวัด <span className="text-red-600">*</span>
                          </label>
                          <select
                            id="unit_id"
                            className={`w-full px-3 py-2 border ${errors.unit_id ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.unit_id}
                            onChange={(e) => setData('unit_id', e.target.value)}
                          >
                            {units.map((unit) => (
                              <option key={unit.id} value={unit.id}>
                                {unit.name}
                              </option>
                            ))}
                          </select>
                          {errors.unit_id && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.unit_id}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            จำนวนคงเหลือ <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="quantity"
                            type="number"
                            className={`w-full px-3 py-2 border ${errors.quantity ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.quantity}
                            onChange={(e) => setData('quantity', Number(e.target.value))}
                            min="0"
                          />
                          {errors.quantity && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.quantity}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="quantity_alert" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            จำนวนแจ้งเตือน <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="quantity_alert"
                            type="number"
                            className={`w-full px-3 py-2 border ${errors.quantity_alert ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.quantity_alert}
                            onChange={(e) => setData('quantity_alert', Number(e.target.value))}
                            min="0"
                          />
                          {errors.quantity_alert && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.quantity_alert}</p>
                          )}
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            แจ้งเตือนเมื่อสินค้าในสต๊อกต่ำกว่านี้
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="buying_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ราคาซื้อ (บาท) <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="buying_price"
                            type="number"
                            className={`w-full px-3 py-2 border ${errors.buying_price ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.buying_price}
                            onChange={(e) => setData('buying_price', Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                          {errors.buying_price && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.buying_price}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="selling_price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ราคาขาย (บาท) <span className="text-red-600">*</span>
                          </label>
                          <input
                            id="selling_price"
                            type="number"
                            className={`w-full px-3 py-2 border ${errors.selling_price ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.selling_price}
                            onChange={(e) => setData('selling_price', Number(e.target.value))}
                            min="0"
                            step="0.01"
                          />
                          {errors.selling_price && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.selling_price}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="tax" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ภาษี (%)
                          </label>
                          <input
                            id="tax"
                            type="number"
                            className={`w-full px-3 py-2 border ${errors.tax ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.tax}
                            onChange={(e) => setData('tax', Number(e.target.value))}
                            min="0"
                            max="100"
                            step="0.01"
                          />
                          {errors.tax && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.tax}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="mb-4">
                          <label htmlFor="tax_type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            ประเภทภาษี
                          </label>
                          <select
                            id="tax_type"
                            className={`w-full px-3 py-2 border ${errors.tax_type ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            value={data.tax_type}
                            onChange={(e) => setData('tax_type', Number(e.target.value))}
                          >
                            <option value="0">รวมในราคาสินค้า</option>
                            <option value="1">แยกต่างหาก</option>
                          </select>
                          {errors.tax_type && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.tax_type}</p>
                          )}
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <div className="mb-4">
                          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            หมายเหตุ
                          </label>
                          <textarea
                            id="notes"
                            className={`w-full px-3 py-2 border ${errors.notes ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300`}
                            rows={3}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                          ></textarea>
                          {errors.notes && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.notes}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 text-right">
                    <button 
                      type="submit" 
                      className="inline-flex items-center px-4 mr-2 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ml-3"
                      disabled={processing}
                    >
                      บันทึก
                    </button>
                    <Link
                      href={route('products.index')}
                      className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150"
                    >
                      ยกเลิก
                    </Link>
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