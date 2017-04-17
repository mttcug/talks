import { Component , OnInit } from '@angular/core';
import { ActivatedRoute , Params } from '@angular/router';

import { UserIndexService } from '../services/user-index.service';
import { HeartService } from '../services/heart.service';

import { UserInfo } from '../models/user-info.model';
import { Heart } from '../models/heart.model';

@Component({
  selector: 'user-index-app',
  templateUrl: 'template/user-index.html',
  styleUrls: ['css/user-index.css'],
})
export class UserIndexComponent implements OnInit {
  user = new UserInfo();
  hearts : Heart[];
  error: string = '';
  showMenu = false;
  errorHandler : any;
  constructor( private userIndexService : UserIndexService ,
               private route : ActivatedRoute ,
               private heartService : HeartService){}

  ngOnInit():void{
    this.route.params
              .subscribe(params=>this.userIndexService.getUserInfo(params['uid'])
              .then(result=>this.user=result['user'],this.clearError.bind(this)));
    this.getHearts().then(result=>{
      console.log(this.hearts);
    });
  }
  clearError(error:any){
    console.log('error:' , error);
    clearTimeout(this.errorHandler);
    this.error = error;
    this.errorHandler = setTimeout(()=>{
      this.error = '';
    } , 4000);
  }
  onSelectMenu(){
    this.showMenu = !this.showMenu;
  }
  getHearts(){
    return this.heartService.getHearts().then(result=>this.hearts=result['hearts'],this.clearError.bind(this));
  }
  sendMessage(){

  }
  sendHeart(){

  }
}