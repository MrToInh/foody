using Clothes_Factory.Factories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Clothes_Factory
{
    internal static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
             Application.EnableVisualStyles();
             Application.SetCompatibleTextRenderingDefault(false);
             Application.Run(new Form1());
            /*Client entrepreneur = new Client(new ElegantClothesFactory());
            entrepreneur.DescribeYourClothes();
            Console.WriteLine($"Entrepreneur: {entrepreneur.DescribeYourClothes()} \n");

            Client student = new Client(new CasualClothesFactory());
            Console.WriteLine($"Student: {student.DescribeYourClothes()}");*/

        }
    }
}
