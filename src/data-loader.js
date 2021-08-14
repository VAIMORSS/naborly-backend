
import path from 'path';
import excelToJson from 'convert-excel-to-json';
import Datastore from 'nedb';

const getXlsxData = () => new Promise((resolve, reject) => {
    const data = excelToJson({
        sourceFile: path.resolve() + "\\src\\data.xlsx",
        columnToKey: {
            A: 'property',
            B: 'latitude',
            C: 'longitude',
            D: 'city',
            E: 'country',
            F: 'monthly_rate',
            G: 'lease_term_months',
            H: 'total_views'
        }
    });

    resolve(data);
})

const loadata = async () => {
    var db = new Datastore({
        filename: path.join(path.resolve(), "/tmp/database.db")
        , autoload: true
    });

    const result = await getXlsxData();

    db.insert(result.Properties, function (err, doc) {
        console.log('Inserted');
    });
}

export default loadata;