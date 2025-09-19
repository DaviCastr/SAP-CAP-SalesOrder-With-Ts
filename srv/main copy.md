import { FullRequestParams } from './protocols';
import { customerController } from './factories/controllers/customer';
import { salesOrderHeaderController } from './factories/controllers/sales-order-header';
import { Customers, SalesOrderHeaders } from '@models/sales';
import { Request, Service } from '@sap/cds';

export default (service: Service) => {
    const { SalesOrderHeaders, Customers } = service.entities;

    service.before(['READ'], '*', (request: Request) => {
        if (!request.user.is('read_only_user') && !request.user.is('admin')) {
            request.reject(403, 'Read Not authorized');
        }
    });

    service.before(['WRITE', 'DELETE'], '*', (request: Request) => {
        if (!request.user.is('admin')) {
            request.reject(403, 'Write/Delete Not authorized');
        }
    });

    service.after('READ', Customers, (customersList: Customers, request) => {
        (request as unknown as FullRequestParams<Customers>).results = customerController.afterRead(customersList);

        //Codification has moved to controller with factory method above
        // results.forEach((customer) => {
        //     if (!customer.email?.includes("@")) {

        //         customer.email = `${customer.email}@gmail.com`;

        //     }
        // });
    });

    // eslint-disable-next-line max-lines-per-function
    service.before('CREATE', SalesOrderHeaders, async (request: Request) => {
        const results = await salesOrderHeaderController.beforeCreate(request.data);
        console.log(request.data.totalAmount);
        if (results.hasError) {
            return request.reject(400, results.error?.message as string);
        }

        request.data.totalAmount = results.totalAmount;
        console.log(request.data.totalAmount);
        // const params = request.data;

        //Addition to get items in a typed way
        // const items: SalesOrderItems = params.items;

        // if (!params.customer_id) {
        //     return request.reject(400, "Invalid customer!");
        // }

        // if (!params.items || params.items?.length === 0) {
        //     return request.reject(400, "Invalid Items")
        // }

        // const query = SELECT.one.from(Customers).where({ id: params.customer_id });
        // const customer = await cds.run(query);

        // console.log(params);

        // if (!customer) {

        //     return request.reject(404, "Customer not found.")

        // }

        // //Stores an array of product IDs
        // const productIds: string[] = params.items.map((item: SalesOrderItem) => item.product_id)
        // const productsQuery = SELECT.from(Products).where({ id: productIds })
        // //Product selection
        // const products: Products = await cds.run(productsQuery);

        // for (const item of items) {

        //     const dbProduct = products.find(product => product.id === item.product_id);

        //     if (!dbProduct) {
        //         return request.reject(404, `Product ${item.product_id} not found.`);
        //     }

        //     if (dbProduct.stock === 0) {
        //         return request.reject(400, `Product ${dbProduct.name}(${dbProduct.id}) sem estoque disponível.`);

        //     }
        // }

        // let totalAmount = 0;
        // items.forEach(item => {
        //     totalAmount += (item.price as number) * (item.quantity as number);
        // });

        // if(totalAmount > 30000){
        //     let discont = totalAmount *(10/100);
        //     totalAmount -= discont;
        // }

        //request.data.totalAmount = totalAmount;
    });

    // eslint-disable-next-line max-lines-per-function
    service.after('CREATE', SalesOrderHeaders, async (salesOrderHeaders: SalesOrderHeaders, request: Request) => {
        await salesOrderHeaderController.afterCreate(salesOrderHeaders, request.user);

        // //Here we are taking if only one sales order comes and transforming it into an array
        // const headersAsArray = Array.isArray(results) ? results : [results] as SalesOrderHeaders;

        // for(const header of headersAsArray){

        //     //Typing the items
        //     const items = header.items as SalesOrderItems;
        //     //Getting the product IDs and quantity
        //     const productsData = items.map(item => ({
        //         id: item.product_id as string,
        //         quantity: item.quantity as number
        //     }));

        //     //Catch the IDs of the products again(redudante)
        //     const productIds: string[] = productsData.map((productData) => productData.id)
        //     const productsQuery = SELECT.from(Products).where({ id: productIds })
        //     //Selecting the products
        //     const products: Products = await cds.run(productsQuery);

        //     for(const productData of productsData){
        //         //Get the product
        //         const foundProduct = products.find(product => product.id === productData.id) as Product;
        //         //Subtract
        //         foundProduct.stock = (foundProduct.stock as number) - productData.quantity;
        //         //Updating
        //         await cds.update(Products).where({ id: foundProduct.id }).with({ stock: foundProduct.stock});
        //     }

        //     const headerAsString = JSON.stringify(header);
        //     const userAsString = JSON.stringify(request.user);

        //     const log = [
        //         {
        //             header_id: header.id,
        //             userData: userAsString,
        //             orderData: headerAsString
        //         }
        //     ]

        //     await cds.create('sales.SalesOrderLogs').entries(log);

        // }
    });
};
