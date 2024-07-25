import Product from '../../../Product/Product';

export default function Manage({ requestData }: any) {
    return <Product product={'transactions'} requestData={requestData} />;
}
