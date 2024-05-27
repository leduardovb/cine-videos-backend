import { isEmpty } from '../../helpers/funtions.helper'

export class PagedDataDTO<T> {
  page: number
  pageSize: number
  totalPages: number
  totalElements: number
  data: Array<T>

  constructor(data: Array<T>, page: number, pageSize: number, totalElements: number) {
    if (!isEmpty(page) && !isEmpty(pageSize)) this.page = page / pageSize + 1
    if (!isEmpty(pageSize)) this.pageSize = Number(pageSize)
    if (!isEmpty(totalElements) && !isEmpty(pageSize)) this.totalPages = Math.ceil(totalElements / pageSize)
    if (!isEmpty(totalElements)) this.totalElements = totalElements
    if (data) this.data = data
  }
}
