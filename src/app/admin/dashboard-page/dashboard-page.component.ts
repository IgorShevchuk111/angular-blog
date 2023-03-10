import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[]
  pSub: Subscription
  dSub: Subscription
  searchStr: ''

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      posts.reverse()
      this.posts = posts
    } )
  }

  ngOnDestroy(): void {
      if (this.pSub) {
        this.pSub.unsubscribe()
      }

      if (this.dSub) {
        this.dSub.unsubscribe()
      }

  }

  delete(id: string){
   this.dSub = this.postsService.delete(id).subscribe( () => {
     this.posts = this.posts.filter( post => post.id != id)
     this.alertService.danger('Post deleted')
   })

  }


}
