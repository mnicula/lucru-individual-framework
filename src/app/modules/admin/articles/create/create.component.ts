import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '@app/core/services/article.service';
import {Router} from '@angular/router';
import {ToastService} from '@app/core/services/toast.service';
import {CategoryModel} from '@app/core/models/category.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  public fileData: File = null;
  public previewUrl: any = '';
  public user = JSON.parse(localStorage.getItem('userId'));
  public form: FormGroup;
  public categories: CategoryModel[];

  constructor(private builder: FormBuilder,
              private articleService: ArticleService,
              private router: Router,
              private toast: ToastService) {
    this.createForm();
    this.articleService.getCategories().subscribe((response) => {
      this.categories = response;
    });
  }

  public ngOnInit() {
  }

  public fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  public createForm(): void {
    this.form = this.builder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      userId: [this.user.id],
      category: ['', Validators.required]
    });
  }

  public preview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };
  }

  public onCancel(): void {
    this.fileData = null;
    this.previewUrl = null;
  }

  public onSubmit(): void {
    const data = this.form.value;
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('title', data.title);
    formData.append('content', data.content);
    formData.append('category', data.category);
    formData.append('userId', data.userId);
    this.articleService.postArticle(formData).subscribe(event => {
        this.router.navigate([`/admin/articles/`]);
        setTimeout(() => {
          this.toast.toastSuccess(`Added an article with id ${event.id}`);
        }, 200);
      }, error => {
        this.toast.toastError(error);
      }
    );
  }

  get title() {
    return this.form.get('title');
  }

  get content() {
    return this.form.get('content');
  }

  get category() {
    return this.form.get('category');
  }

  get image() {
    return this.form.get('image');
  }
}
