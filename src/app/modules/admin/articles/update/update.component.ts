import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '@app/core/services/article.service';
import {UtilityService} from '@app/core/services/utility.service';
import {ArticleModel} from '@app/core/models/article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToastService} from '@app/core/services/toast.service';
import {HttpErrorResponse} from '@angular/common/http';
import {CategoryModel} from '@app/core/models/category.model';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  public form: FormGroup;
  public fileData: File = null;
  public updatedObject: ArticleModel;
  public categories: string[] = [];

  constructor(private builder: FormBuilder,
              private articleService: ArticleService,
              private utilityService: UtilityService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private toast: ToastService) {
    this.route.params.subscribe((params) => {
      const articleId = params['id'];
      this.articleService.getArticleById(articleId).subscribe((response) => {
        this.updatedObject = response;
        this.onCreateForm();
        this.articleService.getCategories().subscribe((categories) => {
          categories.forEach((item) => {
            if (item.name !== this.updatedObject.category) {
              this.categories.push(item.name);
            }
          });
        });
      });
    });
  }

  public onCreateForm(): void {
    const user = JSON.parse(localStorage.getItem('userId'));
    this.form = this.builder.group({
      imageUrl: [this.updatedObject.imageUrl, Validators.required],
      title: [this.updatedObject.title, Validators.required],
      content: [this.updatedObject.content, Validators.required],
      category: [this.updatedObject.category, Validators.required],
      userId: [user.id]
    });
  }

  ngOnInit() {
  }

  public fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  public preview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.updatedObject.imageUrl = reader.result;
    };
  }

  public onCancel(): void {
    this.updatedObject.imageUrl = null;
    this.fileData = null;
  }

  public onSubmit(): void {
    const data = this.form.value;
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('userId', data.userId);
    this.articleService.patchArticle(formData, this.updatedObject.id).subscribe(event => {
        this.router.navigate(['/admin/articles']);
        setTimeout(() => {
          this.toast.toastSuccess(`Updated article with id ${event.id}`);
        }, 200);
      },
      (error) => {
        this.toast.toastError(error);
      }
    );
  }

  public onBack(): void {
    this.location.back();
  }

}
