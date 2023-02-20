import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../interfaces';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post:  Post

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
console.log('fffff', this.post);

  }



}
