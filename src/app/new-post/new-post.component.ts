import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service.js';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  blogPost: any = new BlogPost();
  tags: string;

  constructor(private postData: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  formSubmit() {
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.blogPost.isPrivate = false;
    this.blogPost.postDate = new Date().toLocaleDateString();
    this.blogPost.postedBy = "WEB422 Student";
    this.blogPost.views = 0;
    this.postData.newPost(this.blogPost).subscribe(data => {
      this.router.navigate(['admin']);
    });
  }

}
