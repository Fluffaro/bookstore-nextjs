"use client";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
const API_URL = "http://localhost:8080/tasks";
const CART_API_URL = "http://localhost:8080/cart";

interface TaskType {
    id: number;
    completed: boolean;
    title: string;
    author: string;
    subheading?: string;
    price: number;
  }


const CreateBookForm = ({token}: {token: string | null}) => {






      const form = useForm({
        defaultValues: { title: "", price: 0, author: "" },
      });
    
      const addTask = async (values: { title: string; price: number; author: string }) => {
        if (!values.title) return alert("Enter a book title!");
        if (!token) return alert("You must be logged in to add books!");
    
        try {
          console.log("Adding book with values:", values);
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title: values.title, completed: false, price: values.price, author: values.author }),
          });
          if (!response.ok) {
            throw new Error("Failed to add book");
          }
          form.reset();
          window.location.reload();

          
        } catch (error) {
          console.error("Error adding book:", error);
        }
      };
  return (
    <div><Form {...form}>
    <form onSubmit={form.handleSubmit(addTask)} className="space-y-4 p-4 w-80 bg-white rounded-lg shadow-md">
      <FormField control={form.control} name="title" render={({ field }) => (
        <FormItem>
          <FormLabel>Book Title</FormLabel>
          <FormControl>
            <Input placeholder="Enter Book title" {...field} />
          </FormControl>
        </FormItem>
      )} />
      <FormField control={form.control} name="price" render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input type="number" placeholder="Enter price" {...field} />
          </FormControl>
        </FormItem>
      )} />
      <FormField control={form.control} name="author" render={({ field }) => (
        <FormItem>
          <FormLabel>Author</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Enter book author" {...field} />
          </FormControl>
        </FormItem>
      )} />
      <Button type="submit" className="w-full">Add Book</Button>
    </form>
  </Form></div>
  )
}

export default CreateBookForm