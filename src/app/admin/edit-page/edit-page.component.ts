import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  submitted = false
  form: FormGroup
  post: Post

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertService: AlertService
  ) { }

  ngOnInit(){

    this.form = new FormGroup({
      author: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      text: new FormControl( '', Validators.required)
    })

    this.route.params.pipe(
      switchMap((params: Params) => {
      return this.postsService.getById(params['id'])

    })
    ).subscribe( (post: Post) => {
      this.post = post
      console.log('pp',post);

      this.form = new FormGroup({
        author: new FormControl(post.author, Validators.required),
        title: new FormControl(post.title, Validators.required),
        text: new FormControl( post.text, Validators.required)
      })

    })
  }

  upDate(){
    if(this.form.invalid){
      return
    }
    this.submitted = true
    this.postsService.upDate(
      {
        ...this.form.value,
        id: this.post.id
      }


    ).subscribe((post)=>{
      this.alertService.success('Post updated')
      this.router.navigate(['admin', 'dashboard'])

    })

  }

}
