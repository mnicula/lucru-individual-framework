import {CommentModel} from '@app/core/models/comment.model';

export interface ArticleModel {
  imageUrl?: any;
  category: string;
  title: string;
  content: string;
  id?: any;
  image2?: string;
  content2?: string;
  commentDtos: CommentModel[];
}
