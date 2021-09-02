import {Component, Input} from '@angular/core';
import {Post} from './posts/post.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-added-post';


   post: Post[] = [];
  // tslint:disable-next-line:typedef
  postCreate(postCreate){
    console.log('kkkkkkk' + postCreate);
    this.post.push(postCreate);
  }
}
