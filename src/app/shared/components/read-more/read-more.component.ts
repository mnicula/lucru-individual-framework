import {Component, OnInit} from '@angular/core';
import {ArticleModel} from '@app/core/models/article.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '@app/core/services/utility.service';
import {ArticleService} from '@app/core/services/article.service';
import {Location} from '@angular/common';
import {trigger} from '@angular/animations';
import {fadeIn} from '../../../../../animation';
import {CommentModel} from '@app/core/models/comment.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastService} from '@app/core/services/toast.service';
import {AuthService} from '@app/core/services/auth.service';

@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.scss'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class ReadMoreComponent implements OnInit {
  public article: ArticleModel;
  public dataLoaded: boolean;
  public comments: CommentModel[];
  public form: FormGroup;
  public id: number;
  public dateNow;
  public currentUser;
  public isAdmin: boolean;

  constructor(private utilityService: UtilityService,
              private articleService: ArticleService,
              public router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private formBuilder: FormBuilder,
              private toast: ToastService,
              private authenticationService: AuthService,) {
    this.isAdmin = false;
    this.dataLoaded = false;
    this.utilityService.getArticleId.subscribe((id) => {
      if (id === null) {
        this.route.params.subscribe((params) => {
          const articleId = params['id'];
          this.articleService.getArticleById(articleId).subscribe((response) => {
            this.article = response;
            this.id = this.article.id;
            this.dataLoaded = true;
            this.comments = this.article.commentDtos;
            const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
            this.dateNow = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, 19).replace('T', ' ');
          });
        });
      } else {
        this.articleService.getArticleById(id).subscribe((response) => {
          this.dataLoaded = true;
          this.article = response;
          this.id = this.article.id;
          this.comments = this.article.commentDtos;
          const timeZoneOffset = (new Date()).getTimezoneOffset() * 60000;
          this.dateNow = (new Date(Date.now() - timeZoneOffset)).toISOString().slice(0, 19).replace('T', ' ');
        });
      }
    });
    this.createForm();

  }

  ngOnInit() {
    this.authenticationService.currentUser$.subscribe((res) => {
      this.currentUser = res;
      if (this.currentUser) {
        this.currentUser.authorities.forEach((user) => {
          this.isAdmin = user.authority === 'ROLE_ADMIN';
        });
      }
    });
  }

  public createForm(): void {
    this.authenticationService.getUserId.subscribe((user) => {
      if (user) {
        this.form = this.formBuilder.group({
          content: ['', Validators.compose([Validators.minLength(10), Validators.required])],
          articleId: [0],
          userId: [user.id]
        });
      } else {
        this.form = this.formBuilder.group({
          content: ['', Validators.compose([Validators.minLength(10), Validators.required])],
          articleId: [0],
        });
      }
    });
  }

  public onBack(): void {
    this.location.back();
  }

  get content() {
    return this.form.get('content');
  }

  public differenceHours(date): number {
    let diff = (new Date(Date.now()).getTime() - date.getTime()) / 1000;
    diff /= 60 * 60;
    return Math.abs(Math.round(diff));
  }

  public differenceDays(date): number {
    let diff = (new Date(Date.now()).getTime() - date.getTime()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff));
  }

  public differenceMin(date): number {
    let diff = (new Date(Date.now()).getTime() - date.getTime()) / 1000;
    diff /= 60;
    return Math.abs(Math.round(diff));
  }

  public onSubmit(): void {
    const user = JSON.parse(localStorage.getItem('userId'));
    this.form.get('userId').setValue(Number(user.id));
    this.form.get('articleId').setValue(this.id);
    this.articleService.postComment(this.form.value).subscribe((response) => {
      this.comments.push(this.form.value);
      this.form.reset();
      this.toast.toastSuccess('You added a comment with success!');
    }, error => {
      this.toast.toastError(error);
    });
  }

  public parseDate(value) {
    return new Date(value);
  }

  public onPress(event) {
    if (this.currentUser === null) {
      event.preventDefault();
    } else {
      event.stopPropagation();
    }
  }

  public onDelete(id: number, index: number): void {
    this.articleService.deleteComment(id).subscribe((res) => {
      this.comments.splice(index, 1);
      this.toast.toastSuccess(`You delete a comment with id ${id}!`);
    }, error => {
      this.toast.toastError(error);
    });
  }
}
