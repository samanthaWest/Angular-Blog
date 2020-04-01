import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service.js';
import { ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import { BlogPost } from '../BlogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  id = this.route.snapshot.params['id'];
  blogPost: BlogPost = new BlogPost();
  tags: string;

  constructor(private postData: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Set value of blogPost
    this.postData.getPostById(this.id).subscribe(data => {
      if(data){
        this.blogPost = data;
        // Set tags
        this.tags = this.blogPost.tags.toString();
      }
    });
  }

  formSubmit() {
    // Set new value of blog post tags
    this.blogPost.tags = this.tags.split(",").map(tag => tag.trim());
    this.postData.updatePostById(this.id, this.blogPost).subscribe(data => {
      this.router.navigate(['admin']);
    });
  }

  deletePost(id) {
    this.postData.deletePostById(id).subscribe(data => {
      this.router.navigate(['admin']);
    });
  }

}
