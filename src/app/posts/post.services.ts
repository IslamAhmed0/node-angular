import {Post} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable({ providedIn : 'root' })
export class PostServices {
  private posts: Post[] = [];
// مهم
  private subject = new Subject<Post[]>();

  constructor(private http: HttpClient){
  }

  // tslint:disable-next-line:typedef
  getPosts() {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.subject.next([...this.posts]);
        // console.log(this.posts)
      });
  }
  // tslint:disable-next-line:typedef
  getPostsUpdateListener(){
    return this.subject.asObservable();
  }

  updatePost(id: string,title: string,content: string){
    const post: Post = { id: id, title: title, content: content };
    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe((res) => {
        console.log(res);
      });

  }


  // tslint:disable-next-line:typedef
  addPost(title: string, content: string){
    const post: Post = { id: null, title: title, content: content };
    this.http.post('http://localhost:3000/api/posts', post).subscribe((done) => {
      console.log(done);
      this.posts.push(post);
      this.subject.next(this.posts);

    });
  }

  // tslint:disable-next-line:typedef
  getPost(id: string){
    // return {...this.posts.find((p) => p.id === id)};
    return this.http.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/'+id);

  }

  // tslint:disable-next-line:typedef
  onDeletePost(postId: string){
    console.log(postId);
    // @ts-ignore
    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe((res) => {
        console.log(res);
        const updatedPost = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPost;
        this.subject.next({...this.posts});
      });
  }
}
