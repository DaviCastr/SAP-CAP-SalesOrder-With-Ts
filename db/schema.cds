using {
    managed,
    User
} from '@sap/cds/common';

namespace sales;

entity SalesOrderHeaders {
    key id          : UUID;
        customer    : Association to Customers;
        totalAmount : Decimal(15, 2);
        createdAt   : Timestamp  @cds.on.insert: $now;
        createdBy   : User       @cds.on.insert: $user;
        modifiedAt  : Timestamp  @cds.on.insert: $now   @cds.on.update: $now;
        modifiedBy  : User       @cds.on.insert: $user  @cds.on.update: $user;
        status      : Association to SalesOrderStatuses;
        items       : Composition of many SalesOrderItems
                          on items.header = $self;

}

entity SalesOrderItems : managed {
    key id       : UUID;
        header   : Association to SalesOrderHeaders;
        product  : Association to Products;
        quantity : Integer;
        price    : Decimal(15, 2);
}

entity SalesOrderLogs : managed {
    key id        : UUID;
        header    : Association to SalesOrderHeaders;
        userData  : LargeString;
        orderDate : LargeString;
}

entity SalesOrderStatuses {
    key id: String enum {
        COMPLETED = 'COMPLETED';
        PENDING = 'PENDING';
        REJECTED = 'REJECTED';
    };
    description: localized String; 
}

entity Customers {
    key id        : UUID;
        email     : String(50);
        firstName : String(20);
        lastName  : String(20);
        price     : Decimal(15, 2);
        salesOrders: Association to many SalesOrderHeaders on salesOrders.customer = $self;
}

entity Products {
    key id    : UUID;
        name  : String(255);
        price : Decimal(15, 2);
        stock : Integer;
}
