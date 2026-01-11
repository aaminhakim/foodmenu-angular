import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuService } from '../../services/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  imports: [CommonModule, FormsModule]
})
export class MenuComponent implements OnInit {

  menus: Menu[] = [];
  menu: Menu = { name: '', description: '', price: 0, category: '', available: true };
  isEdit = false;

  // newMenu = {
  //   name: '',
  //   description: '',
  //   price: 0,
  //   category: '',
  //   available: true
  // };

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.menuService.getAll().subscribe(data => {
      this.menus = data;
      this.cdr.detectChanges();
    });
  }

  // addMenu() {
  //   this.menuService.addMenu(this.newMenu).subscribe(() => {
  //     // this.loadMenus();
  //     this.newMenu = {
  //       name: '',
  //       description: '',
  //       price: 0,
  //       category: '',
  //       available: true
  //     };
  //   });
  // }

  saveMenu() {
    if (this.isEdit && this.menu.id) {
      this.menuService.update(this.menu.id, this.menu).subscribe(() => {
        this.resetForm();
        this.loadMenus();
      });
    } else {
      this.menuService.create(this.menu).subscribe(() => {
        this.resetForm();
        this.loadMenus();
      });
    }
  }

  editMenu(menu: Menu) {
    this.menu = { ...menu };
    this.isEdit = true;
  }

  deleteMenu(id?: number) {
    if (!id) return;

    if (confirm('Delete this menu item?')) {
      this.menuService.delete(id).subscribe(() => {
        this.loadMenus();
      });
    }
  }

  resetForm() {
    this.menu = { name: '', description: '', price: 0, category: '', available: true };
    this.isEdit = false;
  }
}
