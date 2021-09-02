import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../posts/post.model';
import {PostServices} from '../posts/post.services';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(public postsService: PostServices) {}
  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostsUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });

  }


  // tslint:disable-next-line:typedef
  onDelete(postId: string) {
    this.postsService.onDeletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }


}
