import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BlogPost } from '../BlogPost';
import {PostService} from '../post.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit, OnDestroy {

  post: BlogPost;
  querySub: any;
  commentName: string;
  commentText: string;

  constructor(private postData: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.querySub = this.route.params.subscribe(params =>{
      this.postData.getPostById(params['id']).subscribe(data => {
        this.post = data;

        // Update view count
        this.post.views += 1;
        this.postData.updatePostById(this.post._id, this.post).subscribe();

      });
    });

  }

  submitComment() {
    let comment = {
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    }

    this.post.comments.push(comment);

    this.postData.updatePostById(this.post._id, this.post).subscribe(data => {
        this.commentText = '';
        this.commentName = '';
    });
  }

  ngOnDestroy(){
    if(this.querySub) this.querySub.unsubscribe();
  }

}
