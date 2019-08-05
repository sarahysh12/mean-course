import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subject } from 'rxjs';

import { Post } from './post.model';
;
@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) {}

    getPosts() {
        this.http.get<{message: string, posts: Post[]}>('http://localhost/3000/api/posts')
        .subscribe((postData) => {
          this.posts = postData.posts;
          this.postUpdated.next([...this.posts]);
        });
    }

    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = { id: null, title:title, content: content };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }
}
