/*
====================================================
EXPORT SERVICE
====================================================

Responsible for

✓ Export CSV
✓ Export PDF

====================================================
*/

const ExportService = {

    exportCSV(transactions){

        let csv =
        "Title,Category,Type,Amount,Date,Recurring\n";

        transactions.forEach(function(transaction){

            csv +=

            `${transaction.title},` +

            `${transaction.category},` +

            `${transaction.type},` +

            `${transaction.amount},` +

            `${transaction.date},` +

            `${transaction.recurring}\n`;

        });

        const blob = new Blob(

            [csv],

            {

                type:"text/csv"

            }

        );

        const url =
        URL.createObjectURL(blob);

        const link =
        document.createElement("a");

        link.href = url;

        link.download =
        "FinTrack-Transactions.csv";

        link.click();

        URL.revokeObjectURL(url);

    },

    exportPDF(transactions){

        const { jsPDF } = window.jspdf;

        const doc = new jsPDF();

        doc.setFontSize(20);

        doc.text("FinTrack Report",20,20);

        let y = 40;

        doc.setFontSize(12);

        doc.text("Title",20,y);
        doc.text("Category",60,y);
        doc.text("Type",110,y);
        doc.text("Amount",150,y);
        doc.text("Date",180,y);

        y += 10;

        let income = 0;
        let expense = 0;

       transactions.forEach(function(transaction){

    doc.text(
        String(transaction.title || ""),
        20,
        y
    );

    doc.text(
        String(transaction.category || ""),
        60,
        y
    );

    doc.text(
        String(transaction.type || ""),
        110,
        y
    );

    doc.text(
        String(transaction.amount ?? 0),
        150,
        y
    );

    doc.text(
        String(transaction.date || ""),
        180,
        y
    );

    if(transaction.type === "Income"){

        income += Number(transaction.amount || 0);

    }else{

        expense += Number(transaction.amount || 0);

    }

    y += 10;

    if(y > 270){

        doc.addPage();

        y = 20;

    }

});

        const balance =
        income-expense;

        y += 15;

        doc.setFontSize(14);

        doc.text(
    `Income : ${currency}${income.toFixed(2)}`,
    20,
    y
);

y += 10;

doc.text(
    `Expense : ${currency}${expense.toFixed(2)}`,
    20,
    y
);

y += 10;

doc.text(
    `Balance : ${currency}${balance.toFixed(2)}`,
    20,
    y
);

        doc.save("FinTrack-Report.pdf");

    }

};