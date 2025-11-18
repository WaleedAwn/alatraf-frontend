import { Component, signal } from '@angular/core';
import { MENU_CONFIG, MenuCategory } from '../../core/navigation/sidebar.items';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  // menu: = [];
 menu =signal< MenuCategory[]>([])
  constructor() {
    this.menu.set( MENU_CONFIG.map((category) => {
      const filteredItems = category.items;
      return {
        ...category,
        items: filteredItems,
      };
    }).filter((category) => category.items.length > 0)); // remove empty categories
  }

  OnClickRoute(){
    
  }
}
