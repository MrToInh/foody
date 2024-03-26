using Clothes_Factory.Abstract_products;
using Clothes_Factory.Factories;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Clothes_Factory
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            int x = comboBox1.SelectedIndex;
            ClothesFactory[] clothesFactory = new ClothesFactory[1];
            switch (x)
            {
                case 1:
                    clothesFactory[0] = new CasualClothesFactory();
                    foreach(ClothesFactory i in  clothesFactory)
                    {
                        Shirt shirt = i.CreateShirt();
                        shirt.showShirt(pictureBox1);
                        Trousers trousers = i.CreateTrousers();
                        trousers.showTrouser(pictureBox2);
                    }    
                    break;
                case 0:

                    clothesFactory[0] = new ElegantClothesFactory();
                    foreach (ClothesFactory i in clothesFactory)
                    {
                        Shirt shirt = i.CreateShirt();
                        shirt.showShirt(pictureBox1);
                        Trousers trousers = i.CreateTrousers();
                        trousers.showTrouser(pictureBox2);
                    }
                    break;
                default: throw new Exception();
            }  
        }
    }
}
