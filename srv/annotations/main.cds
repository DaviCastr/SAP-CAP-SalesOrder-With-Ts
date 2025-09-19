using {MainService} from '../routes/main';

annotate MainService.SalesOrderHeaders with @(

Capabilities: {
    // FilterFunctions : [
    //     'tolower',
    // ],
    DeleteRestrictions : {
        $Type : 'Capabilities.DeleteRestrictionsType',
        Deletable: false
    },
    // UpdateRestrictions : {
    //     $Type : 'Capabilities.UpdateRestrictionsType',
    //     Updatable: true,
    // },
    FilterRestrictions : {
        $Type : 'Capabilities.FilterRestrictionsType',
        FilterExpressionRestrictions: [
            {
                Property: createdAt,
                AllowedExpressions: 'SingleRange'
            },
            {
                Property: modifiedAt,
                AllowedExpressions: 'SingleRange'
            }
        ]
    },
},
UI: {
    SelectionFields: [
        id,
        totalAmount,
        customer_id,
        status_id,
        createdAt,
        modifiedAt
    ],
    LineItem       : [
        {
            $Type                : 'UI.DataField',
            //Label: 'ID',
            Value                : id,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '18rem',
            }
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Customer',
            Value                : customer.id,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            }
        },
        {
            $Type                : 'UI.DataField',
            Label                : 'Status',
            Criticality: (status.id = 'COMPLETED' ? 3 : (status.id = 'PENDING' ? 2 : 1)),
            CriticalityRepresentation: #WithIcon,
            Value                : status.id,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            }
        },
        {
            $Type                : 'UI.DataField',
            //Label: 'Total Amount',
            Value                : totalAmount,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '10rem',
            }
        },
        {
            $Type                : 'UI.DataField',
            ///Label: 'Created At',
            Value                : createdAt,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '15rem',
            }
        },
        {
            $Type                : 'UI.DataField',
            //Label: 'Created By',
            Value                : createdBy,
            ![@HTML5.CssDefaults]: {
                $Type: 'HTML5.CssDefaultsType',
                width: '15rem',
            }
        }
    ],
    HeaderInfo  : {
        $Type : 'UI.HeaderInfoType',
        TypeName : 'Purchase',
        TypeNamePlural : 'Purchases',
        Title: {
            $Type: 'UI.DataField',
            Value: 'ID: {id}'
        }
    },
    Facets: [
        {
            ID: 'salesORderData',
            $Type: 'UI.CollectionFacet',
            Label: 'Purchase Header informations',
            Facets:[
                { 
                    ID: 'header',
                    $Type: 'UI.ReferenceFacet',
                    Target: '@UI.FieldGroup#Header'
                }
            ]
        },
        {
            ID: 'customerData',
            $Type: 'UI.ReferenceFacet',
            Label: 'Customer informations',
            Target: 'customer/@UI.FieldGroup#CustomerData'
        },
        {
            ID: 'itemsData',
            $Type: 'UI.ReferenceFacet',
            Label: 'Puchase Items',
            Target: 'items/@UI.LineItem'
        }
    ],
    FieldGroup#Header : {
        $Type : 'UI.FieldGroupType',
        Data:[
            {
                $Type: 'UI.DataField',
                Value: id
            },
            {
                $Type: 'UI.DataField',
                Value: totalAmount
            },
            {
                $Type: 'UI.DataField',
                Value: createdAt
            },
            {
                $Type: 'UI.DataField',
                Value: createdBy
            }
        ]
        
    },
}) {
    id          @title: 'ID';
    totalAmount @title: 'Total Amount';
    createdAt   @title: 'Created At';
    createdBy   @title: 'Created By';
    customer    @(
        title : 'Customer',
        Common: {
            Label    : 'Customer Name',
            Text     : customer.firstName,
            ValueList: {
                $Type         : 'Common.ValueListType',
                CollectionPath: 'Customers',
                Parameters    : [
                    {
                        $Type            : 'Common.ValueListParameterInOut',
                        ValueListProperty: 'id',
                        LocalDataProperty: 'customer_id'
                    },
                    {
                        $Type            : 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'firstName'
                    },
                    {
                        $Type            : 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'lastName'
                    }
                ]
            },
        }
    );
    status      @(
        title : 'Status',
        Common: {
            Label          : 'Status',
            Text           : status.description,
            TextArrangement: #TextOnly,
            ValueListWithFixedValues,
            ValueList      : {
                $Type         : 'Common.ValueListType',
                CollectionPath: 'SalesOrderStatuses',
                Parameters    : [
                    {
                        $Type            : 'Common.ValueListParameterInOut',
                        ValueListProperty: 'id',
                        LocalDataProperty: 'status_id'
                    },
                    {
                        $Type            : 'Common.ValueListParameterDisplayOnly',
                        ValueListProperty: 'description'
                    }
                ]
            },
        }
    )
};

annotate MainService.SalesOrderStatuses with {
    id @Common: {
        Text           : description,
        TextArrangement: #TextOnly,
    }
};


annotate MainService.Customers with @(
    UI: {
        FieldGroup#CustomerData : {
            $Type : 'UI.FieldGroupType',
            Data:[
            {
                $Type: 'UI.DataField',
                Value: id
            },
            {
                $Type: 'UI.DataField',
                Value: firstName
            },
            {
                $Type: 'UI.DataField',
                Value: lastName
            },
            {
                $Type: 'UI.DataField',
                Value: email
            }
        ]
        },
    }
){
    id          @title: 'ID';
    firstName   @title: 'First Name';
    lastName    @title: 'Last Name';
    email       @title: 'E-mail'; 
};


annotate MainService.SalesOrderItems with @(
    UI: {
        LineItem  : [
            {
                $Type: 'UI.DataField',
                Value: id,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '18rem',
                }
            },
            {
                $Type: 'UI.DataField',
                Value: price
            },
            {
                $Type: 'UI.DataField',
                Value: quantity
            },
            {
                $Type: 'UI.DataField',
                Value: product.name,
                ![@HTML5.CssDefaults]: {
                    $Type: 'HTML5.CssDefaultsType',
                    width: '18rem',
                }
            }
        ],
    }
){
    id @title: 'ID';
    price @title: 'Price';
    quantity @title: 'Quantity';
    header @UI.Hidden @UI.HiddenFilter;
    product @UI.Hidden @UI.HiddenFilter;
};

annotate MainService.Products with {
    name @title: 'Product Name';
};

