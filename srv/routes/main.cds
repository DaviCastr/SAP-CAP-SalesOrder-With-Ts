using {sales as db} from '../../db/schema';
using { db.types.SalesReport, db.types.BulkCreateSalesOrder } from '../../db/types';

@requires: 'authenticated-user'
service MainService @(path: '/sales-order') {

    // @restrict: [
    //     {
    //         grant: 'READ',
    //         to: 'read_only_user'
    //     },
    //     {
    //         grant: ['READ', 'WRITE'],
    //         to: 'admin'
    //     }
    // ]

    entity SalesOrderHeaders as projection on db.SalesOrderHeaders actions {
        //function teste(parametro1: String) returns Boolean;
        //action teste();
        action cloneSalesOrder() returns Boolean;
    };
    
    entity SalesOrderLogs          as projection on db.SalesOrderLogs;

    entity SalesOrderStatuses          as projection on db.SalesOrderStatuses;
    // @restrict: [
    //     {
    //         grant: 'READ',
    //         to: 'read_only_user'
    //     },
    //     {
    //         grant: ['READ', 'WRITE'],
    //         to: 'admin'
    //     }
    // ]
    entity Customers         as projection on db.Customers actions {
        function getSalesReportByCustomerId() returns array of SalesReport.ExpectedResult;
    };
    
    // @restrict: [
    //     {
    //         grant: 'READ',
    //         to: 'read_only_user'
    //     },
    //     {
    //         grant: ['READ', 'WRITE'],
    //         to: 'admin'
    //     }
    // ]
    entity Products          as projection on db.Products;

    //function teste2(parametro1: String) returns Boolean;
    //action teste2();

}

//Functions
extend service MainService with {
    function getSalesReportByDays(days: SalesReport.Params:days) returns array of SalesReport.ExpectedResult;
}

//Actions
extend service MainService with {
    action bulkCreateSalesOrder(payload: array of BulkCreateSalesOrder.Payload ) returns BulkCreateSalesOrder.ExpectedResult;
}