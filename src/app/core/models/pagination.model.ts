import {ArticleModel} from '@app/core/models/article.model';

export class PaginationModel {
  currentPage?: number;
  totalItems?: ArticleModel[];
  startPage?: number;
  startIndex?: number;
  pages?: any;
  endIndex?: number;
  endPage?: any;
  totalPages?: any;


  constructor() {
    this.currentPage = null;
    this.totalItems = null;
    this.startPage = null;
    this.startIndex = null;
    this.pages = null;
    this.endIndex = null;
    this.endPage = null;
    this.totalPages = null;
  }
}
