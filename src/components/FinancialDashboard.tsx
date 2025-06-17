import React, { useState } from 'react';
import { useFinancial, Transaction, InventoryItem } from '../contexts/FinancialContext';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Calendar,
  BarChart3,
  PieChart
} from 'lucide-react';

interface FinancialDashboardProps {
  businessType: 'barbershop' | 'automotive';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const FinancialDashboard: React.FC<FinancialDashboardProps> = ({ businessType, colors }) => {
  const {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    getBusinessTransactions,
    getBusinessInventory,
    getFinancialSummary
  } = useFinancial();

  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'inventory'>('overview');
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showInventoryForm, setShowInventoryForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [editingInventory, setEditingInventory] = useState<InventoryItem | null>(null);

  const transactions = getBusinessTransactions(businessType);
  const inventory = getBusinessInventory(businessType);
  const summary = getFinancialSummary(businessType);

  const lowStockItems = inventory.filter(item => item.quantity <= item.minQuantity);

  const TransactionForm = () => {
    const [formData, setFormData] = useState({
      type: 'income' as 'income' | 'expense',
      category: '',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0]
    });

    const categories = businessType === 'barbershop' 
      ? ['Cortes', 'Barba', 'Produtos', 'Outros']
      : ['Lavagem', 'Enceramento', 'Troca de Óleo', 'Produtos', 'Outros'];

    const expenseCategories = ['Aluguel', 'Produtos', 'Equipamentos', 'Marketing', 'Outros'];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingTransaction) {
        updateTransaction(editingTransaction.id, {
          ...formData,
          amount: parseFloat(formData.amount),
          businessType
        });
        setEditingTransaction(null);
      } else {
        addTransaction({
          ...formData,
          amount: parseFloat(formData.amount),
          businessType
        });
      }
      setFormData({
        type: 'income',
        category: '',
        description: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowTransactionForm(false);
    };

    React.useEffect(() => {
      if (editingTransaction) {
        setFormData({
          type: editingTransaction.type,
          category: editingTransaction.category,
          description: editingTransaction.description,
          amount: editingTransaction.amount.toString(),
          date: editingTransaction.date
        });
        setShowTransactionForm(true);
      }
    }, [editingTransaction]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">
            {editingTransaction ? 'Editar Transação' : 'Nova Transação'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as 'income' | 'expense'})}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Selecione uma categoria</option>
                {(formData.type === 'income' ? categories : expenseCategories).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Valor (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                {editingTransaction ? 'Atualizar' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowTransactionForm(false);
                  setEditingTransaction(null);
                }}
                className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const InventoryForm = () => {
    const [formData, setFormData] = useState({
      name: '',
      category: '',
      quantity: '',
      minQuantity: '',
      unitPrice: '',
      supplier: ''
    });

    const categories = businessType === 'barbershop'
      ? ['Produtos para Cabelo', 'Produtos para Barba', 'Ferramentas', 'Higiene', 'Outros']
      : ['Produtos de Limpeza', 'Óleos', 'Filtros', 'Ceras', 'Ferramentas', 'Outros'];

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (editingInventory) {
        updateInventoryItem(editingInventory.id, {
          ...formData,
          quantity: parseInt(formData.quantity),
          minQuantity: parseInt(formData.minQuantity),
          unitPrice: parseFloat(formData.unitPrice),
          businessType
        });
        setEditingInventory(null);
      } else {
        addInventoryItem({
          ...formData,
          quantity: parseInt(formData.quantity),
          minQuantity: parseInt(formData.minQuantity),
          unitPrice: parseFloat(formData.unitPrice),
          businessType
        });
      }
      setFormData({
        name: '',
        category: '',
        quantity: '',
        minQuantity: '',
        unitPrice: '',
        supplier: ''
      });
      setShowInventoryForm(false);
    };

    React.useEffect(() => {
      if (editingInventory) {
        setFormData({
          name: editingInventory.name,
          category: editingInventory.category,
          quantity: editingInventory.quantity.toString(),
          minQuantity: editingInventory.minQuantity.toString(),
          unitPrice: editingInventory.unitPrice.toString(),
          supplier: editingInventory.supplier
        });
        setShowInventoryForm(true);
      }
    }, [editingInventory]);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <h3 className="text-lg font-semibold mb-4">
            {editingInventory ? 'Editar Item' : 'Novo Item do Estoque'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Produto</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantidade</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Estoque Mínimo</label>
                <input
                  type="number"
                  value={formData.minQuantity}
                  onChange={(e) => setFormData({...formData, minQuantity: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preço Unitário (R$)</label>
              <input
                type="number"
                step="0.01"
                value={formData.unitPrice}
                onChange={(e) => setFormData({...formData, unitPrice: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Fornecedor</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 px-4 rounded-lg text-white font-medium"
                style={{ backgroundColor: colors.primary }}
              >
                {editingInventory ? 'Atualizar' : 'Adicionar'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowInventoryForm(false);
                  setEditingInventory(null);
                }}
                className="flex-1 py-2 px-4 bg-gray-500 text-white rounded-lg font-medium"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.primary }}>
          Gerenciamento Financeiro
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ backgroundColor: activeTab === 'overview' ? colors.primary : undefined }}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'transactions'
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ backgroundColor: activeTab === 'transactions' ? colors.primary : undefined }}
          >
            Transações
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'inventory'
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{ backgroundColor: activeTab === 'inventory' ? colors.primary : undefined }}
          >
            Estoque
          </button>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-medium">Receita Total</p>
                  <p className="text-2xl font-bold text-green-800">
                    R$ {summary.totalIncome.toFixed(2)}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-600 text-sm font-medium">Despesas Totais</p>
                  <p className="text-2xl font-bold text-red-800">
                    R$ {summary.totalExpenses.toFixed(2)}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-medium">Lucro</p>
                  <p className={`text-2xl font-bold ${summary.profit >= 0 ? 'text-blue-800' : 'text-red-800'}`}>
                    R$ {summary.profit.toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-600 text-sm font-medium">Itens em Estoque</p>
                  <p className="text-2xl font-bold text-yellow-800">{inventory.length}</p>
                </div>
                <Package className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Monthly Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Resumo Mensal</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Receita do Mês</p>
                <p className="text-xl font-bold text-green-600">R$ {summary.monthlyIncome.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Despesas do Mês</p>
                <p className="text-xl font-bold text-red-600">R$ {summary.monthlyExpenses.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Low Stock Alert */}
          {lowStockItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-orange-800">Alerta de Estoque Baixo</h3>
              </div>
              <div className="space-y-2">
                {lowStockItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-orange-700">{item.name}</span>
                    <span className="text-sm text-orange-600">
                      {item.quantity} restantes (mín: {item.minQuantity})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Transações</h3>
            <button
              onClick={() => setShowTransactionForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Nova Transação
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Data</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Descrição</th>
                  <th className="text-left p-2">Valor</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{new Date(transaction.date).toLocaleDateString()}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.type === 'income' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                      </span>
                    </td>
                    <td className="p-2">{transaction.category}</td>
                    <td className="p-2">{transaction.description}</td>
                    <td className={`p-2 font-medium ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      R$ {transaction.amount.toFixed(2)}
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingTransaction(transaction)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(transaction.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Controle de Estoque</h3>
            <button
              onClick={() => setShowInventoryForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: colors.primary }}
            >
              <Plus className="w-4 h-4" />
              Novo Item
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Produto</th>
                  <th className="text-left p-2">Categoria</th>
                  <th className="text-left p-2">Quantidade</th>
                  <th className="text-left p-2">Mín.</th>
                  <th className="text-left p-2">Preço Unit.</th>
                  <th className="text-left p-2">Fornecedor</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Ações</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{item.name}</td>
                    <td className="p-2">{item.category}</td>
                    <td className="p-2">{item.quantity}</td>
                    <td className="p-2">{item.minQuantity}</td>
                    <td className="p-2">R$ {item.unitPrice.toFixed(2)}</td>
                    <td className="p-2">{item.supplier}</td>
                    <td className="p-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        item.quantity <= item.minQuantity
                          ? 'bg-red-100 text-red-800'
                          : item.quantity <= item.minQuantity * 2
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.quantity <= item.minQuantity 
                          ? 'Crítico' 
                          : item.quantity <= item.minQuantity * 2 
                          ? 'Baixo' 
                          : 'Normal'}
                      </span>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingInventory(item)}
                          className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteInventoryItem(item.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showTransactionForm && <TransactionForm />}
      {showInventoryForm && <InventoryForm />}
    </div>
  );
};