import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {DatePipe} from "@angular/common";

export interface DisplayColumns {
  displayName: string,
  fieldName: string
}

@Component({
  selector: 'app-crud-data-table',
  templateUrl: './crud-data-table.component.html',
})
export class CrudDataTableComponent implements AfterViewInit {
  // Methods used to pass data from the parent to the child component
  @Input() tableData: any[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() tableHeading: string;

  searchText: any;

  // Methods used to pass data from the child to the parent component
  @Output() onFilterValue = new EventEmitter<any>();
  @Output() onAddItem = new EventEmitter<any>();
  @Output() onViewItem = new EventEmitter<any>();
  @Output() onUpdateItem = new EventEmitter<any>();
  @Output() onDeleteItem = new EventEmitter<any>();


  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator = Object.create(null);

  constructor(public dialog: MatDialog, public datePipe: DatePipe,
              private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {
    //debugger
  }

  ngAfterViewInit(): void {
    this.dataSource.data = this.tableData
    this.dataSource.paginator = this.paginator;
    //debugger
  }

  // View, Edit or Delete a record
  actionRecord(action: string, record: any) {
    if (action === 'View') {
      this.onViewItem.emit(record);
    } else if (action === 'Add') {
      this.onAddItem.emit(record);
    } else if (action === 'Update') {
      this.onUpdateItem.emit(record);
    } else if (action === 'Delete') {
      this.onDeleteItem.emit(record);
    }
  }

  addRowData(data: any) {
    //
    // // Dynamically create the component
    // const factory = this.componentFactoryResolver.resolveComponentFactory(this.singleViewComponent);
    // const componentRef: ComponentRef<any> = factory.create(this.viewContainerRef.injector);
    //
    // // Pass data to the component if needed
    // // componentRef.instance.action = action;
    // componentRef.instance.element = data;
    //
    // // Open the dialog
    // this.dialog.open(componentRef.location.nativeElement);

  }

  updateRowData(data: any) {

  }

  deleteRowData(data: any) {

  }


  // Search for a record
  applyFilter(filterString: any) {
    this.onFilterValue.emit(filterString.trim().toLowerCase());
  }


}
