// entity SalesOrderLogs: managed {
//     key id: UUID;
//         header: Association to SalesOrderHeaders;
//         userData: LargeString;
//         orderDate: LargeString;
// }

type SalesOrderLogProps = {
    id: string;
    headerId: string;
    userData: string;
    orderData: string;
};

type SalesOrderLogCreateProps = Omit<SalesOrderLogProps, 'id'>;

type SalesOrderLogCreateDbProps = Omit<SalesOrderLogProps, 'headerId'> & {
    header_id: string;
};

export class SalesOrderLogModel {
    constructor(private props: SalesOrderLogProps) {}

    public static create(props: SalesOrderLogCreateProps): SalesOrderLogModel {
        return new SalesOrderLogModel({
            ...props,
            id: crypto.randomUUID()
        });
    }

    public get id() {
        return this.props.headerId;
    }

    public get headerId() {
        return this.props.headerId;
    }

    public get userData() {
        return this.props.userData;
    }

    public get orderData() {
        return this.props.orderData;
    }

    public toObject(): SalesOrderLogCreateDbProps {
        return {
            id: this.props.id,
            header_id: this.props.headerId,
            userData: this.props.userData,
            orderData: this.props.orderData
        };
    }
}
