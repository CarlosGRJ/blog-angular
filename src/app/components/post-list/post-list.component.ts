import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
  providers: [PostService, UserService]
})
export class PostListComponent implements OnInit {
  @Input() posts;
  @Input() identity;
  @Input() url;
  @Input() token;
  @Input() user;

  constructor(
    private _postService: PostService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    
  }

  getProfile() {
    // Sacar id del post de la url
    this._route.params.subscribe(params => {
      let userId = +params['id'];
      this.getUser(userId);
      this.getPosts(userId);
    });
  }

  getUser(userId) {
    this._userService.getUser(userId).subscribe(
      response => {
        if(response.status == 'success') {
          this.user = response.user;

          console.log(this.user);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getPosts(userId) {
    this._userService.getPosts(userId).subscribe(
      response => {
        if(response.status == 'success') {
          this.posts = response.posts;

          console.log(this.posts);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  deletePost(id) {
    this._postService.delete(this.token, id).subscribe(
      response => {
        this.getProfile();
      },
      error => {
        console.log(error);
      }
    );
  }

}
