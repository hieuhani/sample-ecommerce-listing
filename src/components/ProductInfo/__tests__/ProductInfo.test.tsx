import React from 'react'
import renderer from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'
import { ProductInfo } from '..'
import { theme } from '../../../theme'
import { Product } from '../../../repositories/products'

const product: Product = {
  displayName: 'Máy tính để bàn - PC Acer AS XC-885 (i5-8400/4GB/1TB HDD/UHD 630/Endless)',
  sku: '1807564',
  images: [{
    url: 'https://phongvu.vn/media/catalog_v2/media/48/18/1570775921.343882_Acer_AS_XC-885_1.jpg',
    priority: 1,
  }],
  status: {
    publish: true,
    sale: 'ngung_kinh_doanh' as const,
  },
  promotionPrices: [{
    channel: 'pv_online',
    terminal: 'phongvu',
    finalPrice: 11890000,
    bestPrice: 11890000,
    promotionPrice: 5000000,
  }],
  price: {
    supplierSalePrice: 11890000,
    sellPrice: 11890000,
  },
  saleCategories: [],
  attributeGroups: [],
  attributes: [],
}

describe('ProductInfo', () => {
  test('ProductInfo renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ProductInfo product={product} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('ProductInfo renders correctly when sale status is not valid', () => {
    const invalidSaleStatusProduct = Object.assign({}, product, {
      status: {
        publish: true,
        sale: 'invalid_status',
      },
    })
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ProductInfo product={invalidSaleStatusProduct} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('ProductInfo renders correctly when there are no promotion', () => {
    const noPromotionProduct = Object.assign({}, product, {
      promotionPrices: [],
    })
    const tree = renderer.create(
      <ThemeProvider theme={theme}>
        <ProductInfo product={noPromotionProduct} />
      </ThemeProvider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
