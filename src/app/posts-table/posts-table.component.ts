import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service.js';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {

  blogPosts: Array<BlogPost> = [];

  constructor(private postData: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Set value of blogPosts
    this.postData.getAllPosts().subscribe(data => {
      if(data.length > 0){
        this.blogPosts = data;
      }
    });
  }

  goToProductDetails(id) {
    this.router.navigate(['/admin/post', id]);
  }
  
}
