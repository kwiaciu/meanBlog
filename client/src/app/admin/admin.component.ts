import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  title = '';
  content = '';
  shortContent = '';
  handleAdd = () => {
    console.log({
      title: this.title,
      shortContent: this.content.slice(0, 120),
      longContent: this.content,
    });
  };

  constructor() {}

  ngOnInit(): void {}
}
