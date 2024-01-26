import { ReactNode, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface TransactionsProps {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionsInput {
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
}

interface TransactionContextType {
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionsInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  function sortByDataDesc(a: TransactionsProps, b: TransactionsProps) {
    if (a.createdAt < b.createdAt) {
      return 1
    } else if (a.createdAt > b.createdAt) {
      return -1
    } else {
      return 0
    }
  }

  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions')

    const dataSorted: TransactionsProps[] = response.data.sort(sortByDataDesc)

    let dataFiltered

    if (query) {
      dataFiltered = dataSorted.filter(
        (transaction) =>
          transaction.category.toUpperCase().includes(query.toUpperCase()) ||
          transaction.description.toUpperCase().includes(query.toUpperCase()),
      )
    }

    setTransactions(dataFiltered || dataSorted)
  }

  async function createTransaction(data: CreateTransactionsInput) {
    const { description, price, category, type } = data

    const response = await api.post('/transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
