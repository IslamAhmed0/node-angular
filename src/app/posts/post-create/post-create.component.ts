import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Post} from '../post.model';
import {FormControl, NgForm, Validators} from '@angular/forms';
import {PostServices} from '../post.services';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  postTitle = '';
  postContent = '';
  post: Post;
  private mode = 'create';
  private postId: string;
  // @Output() postCreate = new EventEmitter<Post>();

  constructor(private postService: PostServices, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap ) => {
      if (params.has('postID')){
        this.mode = 'edit';
        this.postId = params.get('postID');
        // @ts-ignore
        this.post = this.postService.getPosts(this.postId).subscribe(postData => {
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      }
      else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    console.log(this.post);

  }

  // tslint:disable-next-line:typedef
  addPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    // const newPost: Post = {
    //   title: postForm.value.postTitle,
    //   content: postForm.value.postContent
    // };
    if (this.mode === 'create'){
      this.postService.addPost(postForm.value.postTitle, postForm.value.postContent );
    }else {
      this.postService.updatePost(this.postId, postForm.value.postTitle, postForm.value.postContent );
    }

  }

}
